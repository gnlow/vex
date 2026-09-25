import { calcAPCA } from "https://esm.sh/apca-w3@0.1.9"
import { hex } from "https://gnlow.dev/oklch@0.1.3"
import { Dist, arr } from "https://gnlow.dev/disty@0.5.0-beta.4"

const l = Dist.f(x => 0.3+0.7*x)
const c = Dist.f(x => 0.2*x)
const h = Dist.range(0, 360)
const oklch = Dist.cross([l, c, h]).map(x => hex(...x))

const palette =
(n: number) =>
    oklch.repeat(n).filter(l => 
        l.every((c0, i) => l.every((c1, j) => {
            console.log(c0, c1, calcAPCA(c0, c1))
            return i == j || Math.abs(calcAPCA(c0, c1) as number) > 40
        }))
    )

console.log(palette(3).pick("hi"))
