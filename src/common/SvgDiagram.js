import React from "react";

export function SvgDiagram(
    W,
    textsUp = [],
    lines = [],
    textsDn = []) {

    const lineHeight = 16;
    const H = lineHeight * (lines.length + textsUp.length + textsDn.length)

    let objects = []

    let lastY = 2

    const rect = (x, y, w, color) => w && <rect
        key={objects.length}
        x={x}
        y={y}
        width={w}
        height={lineHeight}
        style={{fill:color}}/>

    const text = (x, y, text, textAnchor = "start") => <text
        key={objects.length}
        x={x}
        y={y}
        fontSize=".8em"
        fill="black"
        textAnchor={textAnchor}>
        {text}</text>

    const pushTextToObjects = (e) => {
        e.begin && objects.push(text(2, lastY + 11, e.begin))
        e.center && objects.push(text(W / 2, lastY + 11, e.center, "middle"))
        e.end && objects.push(text(W - 2, lastY + 11, e.end, "end"))
        lastY += lineHeight
    }

    // all texts up line
    textsUp.forEach(pushTextToObjects)

    // all graphical lines
    lines && lines.forEach(e => {
        let lastX = 0
        const maxValue = e.totalValue
        // all parts in one line
        e.parts && e.parts.forEach(p => {
            const calcWidth =  W * (p.value / maxValue)
            objects.push(rect(lastX, lastY, calcWidth, p.color))
            lastX += calcWidth
        })
        lastY += lineHeight
    })
    lastY += 2;

    // all texts down line
    textsDn.forEach(pushTextToObjects)

    return <svg width={W} height={H}>
        {objects.map(e => e)}

        {<rect x="1"
               y={lineHeight * (textsUp.length) + 1}
               width={W - 2}
               height={lines.length * lineHeight}
               style={{strokeWidth:"1",stroke:"#000", fill:"none"}}/>}
    </svg>
}