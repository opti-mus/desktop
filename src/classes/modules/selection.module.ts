import type { DesktopObject, DialogType } from "../../types/config";
import type { WindowController } from "../WindowController";

type ResearchObject = Pick<DesktopObject<DialogType.SHORTCUT>, 'id' | 'position'>

export class SelectionModule {
    engine: WindowController
    public isSelection: boolean
    public selections: Map<string, DOMRect>
    public researchObjects: Map<string, HTMLElement>
    public selectionArea: HTMLDivElement | null

    constructor(engine: WindowController) {
        this.engine = engine

        this.selections = new Map()
        this.researchObjects = new Map()

        this.isSelection = false
        this.selectionArea = null
    }

    public init() {

        this.initListeners()

    }

    private initListeners() {
        this.engine.addCallback('mousemove', (e, engine) => {

            if (engine.isResizing || !this.isSelection) return

            const innerSelections = new Map()
            const { startData } = engine
            const selectArea = this.selectionArea?.getBoundingClientRect()

            if (!selectArea) return

            this.researchObjects.forEach((obj, inx) => {
                const rect = obj.getBoundingClientRect()
                if (!selectArea || !rect) return

                const correct = this.isPointInside(rect, selectArea)

                if (correct) {

                    innerSelections.set(inx, rect)
                }
            })

            if (innerSelections.size !== this.selections.size) {

                this.selections = innerSelections
                this.engine.triggerCallbacks('selection:move', e)
            }

            if (this.selectionArea) {

                const deltaX = e.clientX - startData.mouseX
                const deltaY = e.clientY - startData.mouseY

                const newWidth = Math.abs(startData.mouseX - e.clientX)
                const newHeight = Math.abs(startData.mouseY - e.clientY)
                const newTranslateY = startData.mouseY + deltaY
                const newTranslateX = startData.mouseX + deltaX

                this.selectionArea.style.width = `${newWidth}px`
                this.selectionArea.style.height = `${newHeight}px`


                if (startData.mouseY > e.clientY) {
                    this.selectionArea.style.transform = `translate(${startData.mouseX}px, ${newTranslateY}px)`
                }
                if (startData.mouseX > e.clientX) {
                    this.selectionArea.style.transform = `translate(${newTranslateX}px, ${startData.mouseY}px)`
                }
                if (startData.mouseY > e.clientY && startData.mouseX > e.clientX) {
                    this.selectionArea.style.transform = `translate(${newTranslateX}px, ${newTranslateY}px)`
                }
                if (startData.mouseY < e.clientY && startData.mouseX < e.clientX) {
                    this.selectionArea.style.transform = `translate(${startData.mouseX}px, ${startData.mouseY}px)`
                }
            }
        }, 'selections')

        this.engine.addCallback('mouseup', (e) => {
            this.isSelection = false
            this.destroySelectionArea()
            this.engine.triggerCallbacks('selection:end', e)

            this.selections.forEach((_, inx) => {
                const actual = this.researchObjects.get(inx)
                const newRect = actual?.getBoundingClientRect()

                if (newRect) {
                    this.selections.set(inx, newRect)
                }

            })

        }, 'destroy_selection')

        this.engine.addCallback('mousedown', (e, engine) => {
            const test = Array.from(document.querySelectorAll('[data-shortcut]'))

            this.researchObjects = new Map(test.map(i => ([i.id, i])))

            if (engine.isDragging) return



            this.isSelection = true
            this.createSelectionArea()
            this.selections.clear()
            this.engine.triggerCallbacks('selection:start', e)

            //TODO remove
            document.body.style.userSelect = 'none'

        }, 'destroy_selection')
    }
    // private isPointInside(point: ResearchObject['position'], area: DOMRect) {
    //     if (!point) return
    //     return (
    //         point.x >= area.left - 80 &&
    //         point.x <= area.right - 80 &&
    //         point.y >= area.top - 80 &&
    //         point.y <= area.bottom - 80
    //     )
    // }
    isPointInside(a: DOMRect, b: DOMRect) {
        return (
            a.left <= b.right &&
            a.right >= b.left &&
            a.top <= b.bottom &&
            a.bottom >= b.top
        )

    }
    private createSelectionArea() {
        if (this.selectionArea) this.selectionArea.remove()

        const areaDiv = document.createElement('div')
        areaDiv.id = 'selections'
        areaDiv.style.position = 'fixed'
        areaDiv.style.backgroundColor = `rgba(0, 47, 100, 0.3)`

        document.body.appendChild(areaDiv)

        this.selectionArea = areaDiv

        return areaDiv
    }
    destroySelectionArea() {
        this.selectionArea?.remove()

    }
}