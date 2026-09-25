import type { WindowController } from "../WindowController";

// type ResearchObject = Pick<DesktopObject<DialogType.SHORTCUT>, 'id' | 'position'>

const SELECTION_STYLE = {
    position: 'fixed',
    backgroundColor: `rgba(0, 88, 100, 0.17)`,
    border: '1px solid rgba(0, 68, 100, 0.51)',
    borderRadius: '.2rem'
} satisfies Partial<CSSStyleDeclaration>

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
        }, 'selections_move')

        this.engine.addCallback('mouseup', (e) => {
            this.isSelection = false

            this.destroySelectionArea()
            this.recalcSelections()

            this.engine.triggerCallbacks('selection:end', e)

        }, 'selection_up')

        this.engine.addCallback('mousedown', (e, engine) => {
            this.getResearchObj()

            if (engine.isDragging) return

            this.isSelection = true
            this.createSelectionArea()
            this.selections.clear()
            this.engine.triggerCallbacks('selection:start', e)

        }, 'selection_start')
    }

    isPointInside(a: DOMRect, b: DOMRect) {
        return (
            a.left <= b.right &&
            a.right >= b.left &&
            a.top <= b.bottom &&
            a.bottom >= b.top
        )

    }
    recalcSelections() {
        this.selections.forEach((_, inx) => {
            const actual = this.researchObjects.get(inx)
            const newRect = actual?.getBoundingClientRect()

            if (newRect) {
                this.selections.set(inx, newRect)
            }

        })
    }
    getResearchObj() {
        const elements = Array.from(document.querySelectorAll('[data-shortcut]')) as HTMLElement[]
        const researchObjects = new Map(elements.map(i => ([i.id, i])))

        this.researchObjects = researchObjects

        return researchObjects
    }
    private createSelectionArea() {
        if (this.selectionArea) this.selectionArea.remove()

        const areaDiv = document.createElement('div')
        areaDiv.id = 'selections'

        Object.assign(areaDiv.style, SELECTION_STYLE)

        document.body.appendChild(areaDiv)

        this.selectionArea = areaDiv

        return areaDiv
    }
    destroySelectionArea() {
        this.selectionArea?.remove()

    }
}