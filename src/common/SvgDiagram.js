import React from "react";

export function SvgDiagram(W, H, lines = []) {

    const textHeight = 18
    const lineHeight = (H - textHeight * lines.length) / 2

    let objects = []

    const rect = (x, y, w, color) => w && <rect
        key={objects.length}
        x={x}
        y={y}
        width={w}
        height={lineHeight}
        style={{fill:color}}/>
    const text = (x, y, text, rightAlign = false) => <text
        key={objects.length}
        x={x}
        y={y}
        fontSize=".8em"
        fill="black"
        textAnchor={rightAlign ? "end" : "start"}>
        {text}</text>

    function fillLineObjects(lineNum, line, isUpText, isDnText) {
        // console.error(line)
        const totalVal = line.total.value
        const curVal = line.current.value
        const curText = line.current.text
        const totalText = line.total.text

        const correct = totalVal >= curVal
        const pc = correct
            ? curVal / totalVal
            : totalVal / curVal


        objects.push(rect(W * pc, textHeight + lineHeight * lineNum, W * (1 - pc), correct ? line.total.color : line.total.colorBad))

        if (line.medium) {
            const mediumVal = line.medium.value
            const mediumCorrect = totalVal >= mediumVal
            const mediumPc = mediumCorrect
                ? mediumVal / totalVal
                : totalVal / mediumVal

            objects.push(rect(0, textHeight + lineHeight * lineNum, W * mediumPc, correct ? line.medium.color : line.medium.colorBad))

        }
        objects.push(rect(0, textHeight + lineHeight * lineNum, W * pc, correct ? line.current.color : line.current.colorBad))


        if (isUpText || isDnText) {
            curText && objects.push(text(2, isUpText ? 13 : H - 2, curText))
            totalText && objects.push(text(W - 2, isUpText ? 13 : H - 2, totalText, true))
        }
    }

    lines.forEach((e, ind)=> fillLineObjects(ind, e, ind === 0, ind === lines.length - 1))

    return <svg width={W} height={H}>
        {objects.map(e => e)}
        <rect x="0" y={textHeight} width={W - 1} height={lines.length * lineHeight} style={{strokeWidth:"1",stroke:"#000", fill:"none"}}/>{/*border*/}
    </svg>
}