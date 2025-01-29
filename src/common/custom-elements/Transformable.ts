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
        new Dim2D(1, 1)
    );

    private static MIN_WIDTH = .05;
    private static MIN_HEIGHT = .05;

    static {
        CustomElement.loadStylesheet("transformable");
    }



    private readonly transform: Transform2D = new Transform2D(
        new Vector2D(0, 0),
        new Dim2D(.5, .3),
        // Math.PI / 2
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


        // moving logic

        let mouseDown = false;
        let doMove = false;
        let offset = Vector2D.ZERO;

        window.addEventListener("mousedown", ev => {
            mouseDown = true;
            offset = Transformable.getMouseOffset(ev, this)
                .div(Transformable.CANVAS_BOUNDS.dim.getCorner())
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

                this.dispatchEvent(new Event("move"));
                this.refreshCSSVars();
            }
        });

        window.addEventListener("mouseup", () => mouseDown = false);


        // resizing logic

        const resizeHandleMaker = EF.div({ widthDir: Transformable.WidthResizeDir.NONE, heightDir: Transformable.HeightResizeDir.NONE }, undefined, "resize-handle")
            .attribute("width-resize-dir", (_, params) => params.widthDir)
            .attribute("height-resize-dir", (_, params) => params.heightDir)
            .on("mousedown", (_, self) => {
                self.toggleAttribute("selected", true);
                document.body.style.cursor = self.style.cursor;
                this.style.cursor = self.style.cursor;
            })
            .do(self => window.addEventListener("mouseup", () => {
                self.removeAttribute("selected")
                document.body.style.cursor = "";
                this.style.cursor = "";
            }))
            .do((self, params) => window.addEventListener("mousemove", ev => {
                if (self.hasAttribute("selected")) {
                    const globalMouse = Transformable.CANVAS_BOUNDS.clamp(Transformable.getMouseOffset(ev, this.parentElement!));
                    const localMouse = this.transform.toLocalSpace(globalMouse);

                    const localOppositeCorner = Vector2D.ZERO.copy();

                    if (params.widthDir === Transformable.WidthResizeDir.LEFT) {
                        localOppositeCorner.x = .5;
                        localMouse.x = Math.min(localMouse.x, localOppositeCorner.x - Transformable.MIN_WIDTH / this.transform.dim.width);
                    }
                    else if (params.widthDir === Transformable.WidthResizeDir.RIGHT) {
                        localOppositeCorner.x = -.5;
                        localMouse.x = Math.max(localMouse.x, localOppositeCorner.x + Transformable.MIN_WIDTH / this.transform.dim.width);
                    }
                    if (params.heightDir === Transformable.HeightResizeDir.UP) {
                        localOppositeCorner.y = .5;
                        localMouse.y = Math.min(localMouse.y, localOppositeCorner.y - Transformable.MIN_HEIGHT / this.transform.dim.height);
                    }
                    else if (params.heightDir === Transformable.HeightResizeDir.DOWN) {
                        localOppositeCorner.y = -.5;
                        localMouse.y = Math.max(localMouse.y, localOppositeCorner.y + Transformable.MIN_HEIGHT / this.transform.dim.height);
                    }

                    const localNewBounds = Bounds2D.fromCorners(localOppositeCorner, localMouse);
                    if (params.widthDir === Transformable.WidthResizeDir.NONE) {
                        localNewBounds.dim.width = 1;
                        localNewBounds.center.x = 0;
                    }
                    if (params.heightDir === Transformable.HeightResizeDir.NONE) {
                        localNewBounds.dim.height = 1;
                        localNewBounds.center.y = 0;
                    }

                    const globalNewCenter = this.transform.toGlobalSpace(localNewBounds.center);

                    this.transform.rotation = this.transform.rotation;
                    this.transform.center = globalNewCenter;
                    this.transform.dim = localNewBounds.dim.mult(this.transform.dim);

                    this.dispatchEvent(new Event("resize"));
                    this.refreshCSSVars();
                }
            }))
            .do((self, params) => this.addEventListener("rotate", () => {
                const globalHeading = Transformable.getHeading(params.widthDir, params.heightDir) + this.transform.rotation;

                // use correct cursor
                const headingIndex = Math.round(globalHeading / (Math.PI / 4) + 4) % 4;
                self.style.cursor = [
                    "ew-resize",
                    "nwse-resize",
                    "ns-resize",
                    "nesw-resize"
                ][headingIndex];
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
        this.dispatchEvent(new Event("rotate"));


        // rotating logic

        this.append(
            EF.div({}, undefined, "rotate-handle-line")
                .make(),
            EF.p({}, "cached")
                .classes("icon", "rotate-handle")
                .style({ display: "none" })
                .on("mousedown", (_, self) => self.toggleAttribute("selected", true))
                .do(self => window.addEventListener("mouseup", () => self.removeAttribute("selected")))
                .do(self => window.addEventListener("mousemove", ev => {
                    if (self.hasAttribute("selected")) {
                        const mouse = Transformable.getMouseOffset(ev, this);
                        this.transform.rotation = mouse.heading() + Math.PI / 2;

                        this.dispatchEvent(new Event("rotate"));
                        this.refreshCSSVars();
                    }
                }))
                .make()
        );

    }


    private refreshCSSVars() {
        this.style.setProperty("--transform-position-x", this.transform.center.x * 100 + '%');
        this.style.setProperty("--transform-position-y", this.transform.center.y * 100 + '%');

        this.style.setProperty("--transform-size-width", Math.abs(this.transform.dim.width) * 100 + '%');
        this.style.setProperty("--transform-size-height", Math.abs(this.transform.dim.height) * 100 + '%');

        this.style.setProperty("--transform-rotation", this.transform.rotation + "rad");
    }



    protected static getMouseOffset(ev: MouseEvent, elem: Element): Vector2D {
        const elemBounds = Bounds2D.fromElement(elem);
        const mouse = Vector2D.fromPoint(ev);

        return mouse.sub(elemBounds.center)
            .div(elemBounds.dim.getCorner());
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

    export function getHeading(widthDir: WidthResizeDir, heightDir: HeightResizeDir): number {
        const v = Vector2D.ZERO.copy();

        if (widthDir === WidthResizeDir.LEFT) v.x = -1;
        else if (widthDir === WidthResizeDir.RIGHT) v.x = 1;
        if (heightDir === HeightResizeDir.UP) v.y = -1;
        else if (heightDir === HeightResizeDir.DOWN) v.y = 1;

        return v.heading();
    }

}

export default Transformable;