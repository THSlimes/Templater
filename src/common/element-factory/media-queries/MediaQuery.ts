export default abstract class MediaQuery {

    public abstract toString(): string;

    public match() {
        return matchMedia(`(${this.toString()})`);
    }

    public matches() {
        return this.match().matches
    }

}