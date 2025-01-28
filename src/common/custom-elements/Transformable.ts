import ElementFactory from "../element-factory/ElementFactory";
import Bounds2D from "../geometry/Bounds2D";
import Dim2D from "../geometry/Dim2D";
import Transform2D from "../geometry/Transform2D";
import Vector2D from "../geometry/Vector2D";
import MathUtil from "../util/MathUtil";
import CustomElement from "./CustomElement";

const EF = ElementFactory.INSTANCE;

abstract class Transformable extends CustomElement {

    private static CANVAS_BOUNDS = new Bounds2D(
        new Vector2D(0, 0),
        new Dim2D(100, 100)
    );

    private static MIN_WIDTH = 5;
    private static MIN_HEIGHT = 5;

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
        let doMove = false;
        let offset = Vector2D.ZERO;

        window.addEventListener("mousedown", ev => {
            mouseDown = true;
            offset = Transformable.getMouseOffset(ev, this)
                .scale(.01)
                .mult(this.transform.dim.getCorner());

            this.isControlsVisible = ev.target instanceof Node && this.contains(ev.target);
            doMove = ev.target === this;
        });

        window.addEventListener("mousemove", ev => {
            if (doMove && mouseDown) {

                this.transform.center = Transformable.CANVAS_BOUNDS.clamp(
                    Transformable.getMouseOffset(ev, this.parentElement!)
                        .sub(offset)
                );


                this.refreshCSSVars();
            }
        });

        window.addEventListener("mouseup", () => mouseDown = false);

        const resizeHandleMaker = EF.div({ widthDir: Transformable.WidthResizeDir.NONE, heightDir: Transformable.HeightResizeDir.NONE }, undefined, "resize-handle")
            .attribute("width-resize-dir", (self, params) => params.widthDir)
            .attribute("height-resize-dir", (self, params) => params.heightDir)
            .on("mousedown", (_, self) => self.toggleAttribute("selected", true))
            .do(self => window.addEventListener("mouseup", () => self.removeAttribute("selected")))
            .do((self, params) => window.addEventListener("mousemove", ev => {
                if (self.hasAttribute("selected")) {
                    const mouse = Transformable.CANVAS_BOUNDS.clamp(Transformable.getMouseOffset(ev, this.parentElement!));

                    let oppositeCorner: Vector2D = this.transform.center;
                    if (params.widthDir === Transformable.WidthResizeDir.LEFT) {
                        oppositeCorner.x = this.transform.right;
                        mouse.x = MathUtil.clamp(mouse.x, undefined, oppositeCorner.x - Transformable.MIN_WIDTH); // enforce min width
                    }
                    else if (params.widthDir === Transformable.WidthResizeDir.RIGHT) {
                        oppositeCorner.x = this.transform.left;
                        mouse.x = MathUtil.clamp(mouse.x, oppositeCorner.x + Transformable.MIN_WIDTH); // enforce min width
                    }
                    if (params.heightDir === Transformable.HeightResizeDir.UP) {
                        oppositeCorner.y = this.transform.bottom;
                        mouse.y = MathUtil.clamp(mouse.y, undefined, oppositeCorner.y - Transformable.MIN_HEIGHT); // enforce min height
                    }
                    else if (params.heightDir === Transformable.HeightResizeDir.DOWN) {
                        oppositeCorner.y = this.transform.top;
                        mouse.y = MathUtil.clamp(mouse.y, oppositeCorner.y + Transformable.MIN_HEIGHT); // enforce min height
                    }

                    const newBounds = Bounds2D.fromCorners(oppositeCorner, mouse);
                    newBounds.dim = newBounds.dim.abs();

                    if (params.widthDir !== Transformable.WidthResizeDir.NONE) {
                        this.transform.center.x = newBounds.center.x;
                        this.transform.dim.width = newBounds.dim.width;
                    }
                    if (params.heightDir !== Transformable.HeightResizeDir.NONE) {
                        this.transform.center.y = newBounds.center.y;
                        this.transform.dim.height = newBounds.dim.height;
                    }


                    this.refreshCSSVars();
                }
            }));

        this.append(
            resizeHandleMaker.make({ widthDir: Transformable.WidthResizeDir.LEFT, heightDir: Transformable.HeightResizeDir.UP }),
            resizeHandleMaker.make({ widthDir: Transformable.WidthResizeDir.NONE, heightDir: Transformable.HeightResizeDir.UP }),
            resizeHandleMaker.make({ widthDir: Transformable.WidthResizeDir.RIGHT, heightDir: Transformable.HeightResizeDir.UP }),
            resizeHandleMaker.make({ widthDir: Transformable.WidthResizeDir.LEFT, heightDir: Transformable.HeightResizeDir.NONE }),
            resizeHandleMaker.make({ widthDir: Transformable.WidthResizeDir.RIGHT, heightDir: Transformable.HeightResizeDir.NONE }),
            resizeHandleMaker.make({ widthDir: Transformable.WidthResizeDir.LEFT, heightDir: Transformable.HeightResizeDir.DOWN }),
            resizeHandleMaker.make({ widthDir: Transformable.WidthResizeDir.NONE, heightDir: Transformable.HeightResizeDir.DOWN }),
            resizeHandleMaker.make({ widthDir: Transformable.WidthResizeDir.RIGHT, heightDir: Transformable.HeightResizeDir.DOWN }),
        );

    }


    private refreshCSSVars() {
        this.style.setProperty("--transform-position-x", this.transform.center.x + '%');
        this.style.setProperty("--transform-position-y", this.transform.center.y + '%');

        this.style.setProperty("--transform-size-width", Math.abs(this.transform.dim.width) + '%');
        this.style.setProperty("--transform-size-height", Math.abs(this.transform.dim.height) + '%');

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

namespace Transformable {

    export enum WidthResizeDir {
        NONE = "none",
        LEFT = "left",
        RIGHT = "right"
    }

    export enum HeightResizeDir {
        NONE = "none",
        UP = "up",
        DOWN = "down"
    }

}

export default Transformable;