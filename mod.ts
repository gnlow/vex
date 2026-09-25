import { calcAPCA } from "https://esm.sh/apca-w3@0.1.9"
import { hex } from "https://gnlow.dev/oklch@0.1.3"
import { Dist, arr } from "https://gnlow.dev/disty@0.5.0-beta.4"
export { arr }

const l = Dist.f(x => 0.2+0.8*x)
const c = Dist.f(x => 0.3*x)
const h = Dist.range(0, 360)
const oklch = Dist.cross([l, c, h]).map(x => hex(...x))

const palette =
(n: number, adjs: [number, number][]) =>
    oklch.repeat(n).filter(l => 
       adjs.every(([i, j]) => {
            return Math.abs(calcAPCA(l[i], l[j]) as number) > 40
        })
    ).map(l => {
        l.forEach((c0, i) => l.forEach((c1, j) => {
            if (i == j) return
            if (Math.abs(calcAPCA(c0, c1)) < 5) {
                l[j] = c0
            }
        }))
        return l
    })

export const horiz =
(n: number) =>
palette(n, arr(n-1).map(i => [i, i+1])).map(l => `<svg xmlns="http://w3.org/2000/svg" viewbox="0 0 5 3">
${
    l.map((c, i) =>
        `<rect x="0" y="${3/n*i}" width="5" height="${3/n}" fill="${c}"/>`)
        .join("\n")
}
</svg>`)
export const verti =
(n: number) =>
palette(n, arr(n-1).map(i => [i, i+1])).map(l => `<svg xmlns="http://w3.org/2000/svg" viewbox="0 0 5 3">
${
    l.map((c, i) =>
        `<rect x="${5/n*i}" y="0" width="${5/n}" height="3" fill="${c}"/>`)
        .join("\n")
}
</svg>`)
export const dexter =
(n: number) =>
palette(n, arr(n-1).map(i => [i, i+1])).map(l => `<svg xmlns="http://w3.org/2000/svg" viewbox="0 0 5 3">
${
    l.map((c, i) =>
        `<rect
            transform="
                translate(${5/2}, ${3/2})
                rotate(${Math.atan(3/5)*180/Math.PI})
                scale(
                    ${(5*Math.cos(Math.atan(3/5))+3*Math.sin(Math.atan(3/5)))/5},
                    ${(5*Math.sin(Math.atan(3/5))+3*Math.cos(Math.atan(3/5)))/3}
                )
                translate(${-5/2}, ${-3/2})
            "
            x="0" y="${3/n*i}" width="5" height="${3/n}" fill="${c}"/>`)
        .join("\n")
}
</svg>`)
export const sinister =
(n: number) =>
palette(n, arr(n-1).map(i => [i, i+1])).map(l => `<svg xmlns="http://w3.org/2000/svg" viewbox="0 0 5 3">
${
    l.map((c, i) =>
        `<rect
            transform="
                translate(${5/2}, ${3/2})
                rotate(${-Math.atan(3/5)*180/Math.PI})
                scale(
                    ${(5*Math.cos(Math.atan(3/5))+3*Math.sin(Math.atan(3/5)))/5},
                    ${(5*Math.sin(Math.atan(3/5))+3*Math.cos(Math.atan(3/5)))/3}
                )
                translate(${-5/2}, ${-3/2})
            "
            x="0" y="${3/n*i}" width="5" height="${3/n}" fill="${c}"/>`)
        .join("\n")
}
</svg>`)

export const ortho =
palette(4, [[0, 1], [0, 2], [3, 1], [3, 2]]).map(l => `<svg xmlns="http://w3.org/2000/svg" viewbox="0 0 5 3">
${
    l.map((c, i) =>
        `<rect x="${5/2*~~(i/2)}" y="${3/2*(i%2)}" width="${5/2}" height="${3/2}" fill="${c}"/>`)
        .join("\n")
}
</svg>`)
export const saltire =
palette(4, [[0, 1], [1, 2], [2, 3], [3, 0]]).map(l => `<svg xmlns="http://w3.org/2000/svg" viewbox="0 0 5 3">
    <path fill="${l[0]}" d="M 0 0 L ${5/2} ${3/2} L 0 3 Z"/>
    <path fill="${l[1]}" d="M 5 0 L ${5/2} ${3/2} L 0 0 Z"/>
    <path fill="${l[2]}" d="M 5 3 L ${5/2} ${3/2} L 5 0 Z"/>
    <path fill="${l[3]}" d="M 0 3 L ${5/2} ${3/2} L 5 3 Z"/>
</svg>`)

export const flag = Dist.u([
    Dist.range(2, 5).flatMap(horiz),
    Dist.range(2, 6).flatMap(verti),
    Dist.range(2, 5).flatMap(dexter),
    Dist.range(2, 5).flatMap(sinister),
    ortho,
    saltire,
]).flat()
