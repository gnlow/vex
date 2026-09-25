import { Dist, arr } from "https://gnlow.dev/disty@0.5.0-beta.4"
import { apcach, crToBg, maxChroma, cssToApcach, apcachToCss } from "https://esm.sh/apcach@0.6.4"

const l = Dist.f(x => 0.3+0.7*x)
const c = Dist.f(x => 0.2*x)
const h = Dist.range(0, 360)
const oklch = Dist.cross({ l, c, h })

const f =
({ l, c, h }: { l: number, c: number, h: number }) =>
    `oklch(${l} ${c} ${h})`
    
export const p3 =
    oklch.repeat(3).flatMap(([c0, c1, c2]) => Dist.cross([
        apcach(crToBg(f(c0), 0), maxChroma(c0.c), c0.h),
        Dist.range(50, 100).map(contrast =>
            apcach(crToBg(f(c0), contrast), maxChroma(c1.c), c1.h)
        ),
        Dist.range(50, 100).map(contrast =>
            apcach(crToBg(f(c0), contrast), maxChroma(c2.c), c2.h)
        ),
    ])).map(x => x.map(x => apcachToCss(x, "hex")))

export const triHoriz = p3.map(l => `<svg xmlns="http://w3.org/2000/svg" viewbox="0 0 5 3">
${
    l.map((c, i) =>
        `<rect x="0" y="${i}" width="5" height="1" fill="${c}"/>`)
        .join("\n")
}
</svg>`)
