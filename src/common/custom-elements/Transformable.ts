import CustomElement from "./CustomElement";

abstract class Transformable extends CustomElement {

    static {
        CustomElement.loadStylesheet("transformable");
    }



    private readonly transform: Transformable.Transform = {
        position: { x: 0, y: 0 },
        size: { width: 10, height: 10 },
        rotation: 0
    };

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
        let offset: Transformable.Position = { x: 0, y: 0 };

        window.addEventListener("mousedown", ev => {
            mouseDown = true;
            offset = Transformable.Position.mult(
                Transformable.getMouseOffset(ev, this),
                Transformable.Position.getScaleFactor(this, this.parentElement!)
            );

            this.isControlsVisible = ev.target === this;
        });

        window.addEventListener("mousemove", ev => {
            if (this.isControlsVisible && mouseDown) {

                this.transform.position = Transformable.Position.sub(
                    Transformable.getMouseOffset(ev, this.parentElement!),
                    offset
                );

                this.refreshCSSVars();
            }
        });

        window.addEventListener("mouseup", () => mouseDown = false);
    }


    private refreshCSSVars() {
        this.style.setProperty("--transform-position-x", this.transform.position.x + '%');
        this.style.setProperty("--transform-position-y", this.transform.position.y + '%');

        this.style.setProperty("--transform-size-width", this.transform.size.width + '%');
        this.style.setProperty("--transform-size-height", this.transform.size.height + '%');

        this.style.setProperty("--transform-rotation", this.transform.rotation + "deg");
    }



    protected static getMouseOffset(ev: MouseEvent, elem: Element): Transformable.Position {
        const rect = elem.getBoundingClientRect();

        return {
            x: (ev.clientX - rect.x) / rect.width * 100,
            y: (ev.clientY - rect.y) / rect.height * 100
        };
    }

}

namespace Transformable {

    /** A position represents an (x, y) offset for the top-left corner */
    export interface Position {
        /** x-coordinate (horizontal) offset, measured in percent */
        x: number,
        /** y-coordinate (vertical) offset, measured in percent */
        y: number
    }

    export namespace Position {

        export function add(a: Position, b: Position): Position {
            return {
                x: a.x + b.x,
                y: a.y + b.y
            };
        }

        export function sub(a: Position, b: Position): Position {
            return {
                x: a.x - b.x,
                y: a.y - b.y
            };
        }

        export function mult(a: Position, b: Position): Position {
            return {
                x: a.x * b.x,
                y: a.y * b.y
            }
        }

        export function getScaleFactor(a: Element, b: Element): Position {
            const aRect = a.getBoundingClientRect();
            const bRect = b.getBoundingClientRect();

            return {
                x: aRect.width / bRect.width,
                y: aRect.height / bRect.height
            };
        }

    }


    export interface Transform {
        /** The position represents an (x, y) offset for the top-left corner */
        position: Position,
        /** Size of the bounding-box */
        size: {
            /** Width, measured in percent */
            width: number,
            /** Height, measured in percent */
            height: number
        },
        /** Rotation around the center, measured in degrees */
        rotation: number
    }

}

export default Transformable;