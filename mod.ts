import { calcAPCA } from "https://esm.sh/apca-w3@0.1.9"
import { hex } from "https://gnlow.dev/oklch@0.1.3"
import { Dist, arr } from "https://gnlow.dev/disty@0.5.0-beta.4"
export { arr }

const l = Dist.f(x => 0.3+0.7*x)
const c = Dist.f(x => 0.2*x)
const h = Dist.range(0, 360)
const oklch = Dist.cross([l, c, h]).map(x => hex(...x))

const palette =
(n: number, adjs: [number, number][]) =>
    oklch.repeat(n).filter(l => 
       adjs.every(([i, j]) => {
            return Math.abs(calcAPCA(l[i], l[j]) as number) > 40
        })
    )

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

export const flag = Dist.u([
    Dist.range(2, 6).flatMap(horiz),
    Dist.range(2, 6).flatMap(verti),
]).flat()
