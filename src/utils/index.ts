export const parseTranslate = (transform?: string) => {
    if (!transform) return { x: 0, y: 0 }
    const match = transform.match(/translate\(\s*(-?[\d.]+)px,\s*(-?[\d.]+)px\s*\)/)

    return {
        x: match ? Number(match[1]) : 0,
        y: match ? Number(match[2]) : 0
    }
}