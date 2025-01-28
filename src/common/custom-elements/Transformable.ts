import Bounds2D from "../geometry/Bounds2D";
import Dim2D from "../geometry/Dim2D";
import Transform2D from "../geometry/Transform2D";
import Vector2D from "../geometry/Vector2D";
import CustomElement from "./CustomElement";

export default abstract class Transformable extends CustomElement {

    private static CANVAS_BOUNDS = new Bounds2D(
        new Vector2D(0, 0),
        new Dim2D(100, 100)
    );

    static {
        CustomElement.loadStylesheet("transformable");
    }



    private readonly transform: Transform2D = new Transform2D(
        new Vector2D(0, 0),
        new Dim2D(30, 30),
        0
    );

    public get isControlsVisible() {
        return this.hasAttribute("controls-visible");
    }

    public set isControlsVisible(newVal: boolean) {
        this.toggleAttribute("controls-visible", newVal);
    }


    public constructor() {
        super();
    }

    protected override initElement(): void | Promise<void> {
        this.toggleAttribute("transformable", true);
        this.refreshCSSVars();


        let mouseDown = false;
        let offset = Vector2D.ZERO;

        window.addEventListener("mousedown", ev => {
            mouseDown = true;
            offset = Transformable.getMouseOffset(ev, this)
                .scale(.01)
                .mult(this.transform.dim.getCorner());

            this.isControlsVisible = ev.target === this;
        });

        window.addEventListener("mousemove", ev => {
            if (this.isControlsVisible && mouseDown) {

                this.transform.center = Transformable.CANVAS_BOUNDS.clamp(
                    Transformable.getMouseOffset(ev, this.parentElement!)
                        .sub(offset)
                );


                this.refreshCSSVars();
            }
        });

        window.addEventListener("mouseup", () => mouseDown = false);
    }


    private refreshCSSVars() {
        this.style.setProperty("--transform-position-x", this.transform.center.x + '%');
        this.style.setProperty("--transform-position-y", this.transform.center.y + '%');

        this.style.setProperty("--transform-size-width", this.transform.dim.width + '%');
        this.style.setProperty("--transform-size-height", this.transform.dim.height + '%');

        this.style.setProperty("--transform-rotation", this.transform.rotation + "deg");
    }



    protected static getMouseOffset(ev: MouseEvent, elem: Element): Vector2D {
        const elemBounds = Bounds2D.fromElement(elem);
        const mouse = Vector2D.fromPoint(ev);

        return mouse.sub(elemBounds.center)
            .div(elemBounds.dim.getCorner())
            .scale(100);
    }

}