import AssemblyLine from "./assembly-lines/AssemblyLine";
import AnchorAssemblyLine from "./assembly-lines/element-specific/AnchorAssemblyLine";
import AudioAssemblyLine from "./assembly-lines/element-specific/AudioAssemblyLine";
import BaseAssemblyLine from "./assembly-lines/element-specific/BaseAssemblyLine";
import BodyAssemblyLine from "./assembly-lines/element-specific/BodyAssemblyLine";
import BRAssemblyLine from "./assembly-lines/element-specific/BRAssemblyLine";
import ButtonAssemblyLine from "./assembly-lines/element-specific/ButtonAssemblyLine";
import CanvasAssemblyLine from "./assembly-lines/element-specific/CanvasAssemblyLine";
import DataAssemblyLine from "./assembly-lines/element-specific/DataAssemblyLine";
import DataListAssemblyLine from "./assembly-lines/element-specific/DataListAssemblyLine";
import DialogAssemblyLine from "./assembly-lines/element-specific/DialogAssemblyLine";
import DivAssemblyLine from "./assembly-lines/element-specific/DivAssemblyLine";
import DListAssemblyLine from "./assembly-lines/element-specific/DListAssemblyLine";
import EmbedAssemblyLine from "./assembly-lines/element-specific/EmbedAssemblyLine";
import FieldSetAssemblyLine from "./assembly-lines/element-specific/FieldSetAssemblyLine";
import FormAssemblyLine from "./assembly-lines/element-specific/FormAssemblyLine";
import HeadAssemblyLine from "./assembly-lines/element-specific/HeadAssemblyLine";
import HeadingAssemblyLine from "./assembly-lines/element-specific/HeadingAssemblyLine";
import HRAssemblyLine from "./assembly-lines/element-specific/HRAssemblyLine";
import HTMLAssemblyLine from "./assembly-lines/element-specific/HTMLAssemblyLine";
import IFrameAssemblyLine from "./assembly-lines/element-specific/IFrameAssemblyLine";
import ImageAssemblyLine from "./assembly-lines/element-specific/ImageAssemblyLine";
import InputAssemblyLine from "./assembly-lines/element-specific/InputAssemblyLine";
import LabelAssemblyLine from "./assembly-lines/element-specific/LabelAssemblyLine";
import LegendAssemblyLine from "./assembly-lines/element-specific/LegendAssemblyLine";
import LIAssemblyLine from "./assembly-lines/element-specific/LIAssemblyLine";
import LinkAssemblyLine from "./assembly-lines/element-specific/LinkAssemblyLine";
import MenuAssemblyLine from "./assembly-lines/element-specific/MenuAssemblyLine";
import MetaAssemblyLine from "./assembly-lines/element-specific/MetaAssemblyLine";
import MeterAssemblyLine from "./assembly-lines/element-specific/MeterAssemblyLine";
import ObjectAssemblyLine from "./assembly-lines/element-specific/ObjectAssemblyLine";
import OptGroupAssemblyLine from "./assembly-lines/element-specific/OptGroupAssemblyLine";
import OptionAssemblyLine from "./assembly-lines/element-specific/OptionAssemblyLine";
import OrderedListAssemblyLine from "./assembly-lines/element-specific/OrderedListAssemblyLine";
import OutputAssemblyLine from "./assembly-lines/element-specific/OutputAssemblyLine";
import ParagraphAssemblyLine from "./assembly-lines/element-specific/ParagraphAssemblyLine";
import PictureAssemblyLine from "./assembly-lines/element-specific/PictureAssemblyLine";
import PreAssemblyLine from "./assembly-lines/element-specific/PreAssemblyLine";
import ProgressAssemblyLine from "./assembly-lines/element-specific/ProgressAssemblyLine";
import ScriptAssemblyLine from "./assembly-lines/element-specific/ScriptAssemblyLine";
import SelectAssemblyLine from "./assembly-lines/element-specific/SelectAssemblyLine";
import SourceAssemblyLine from "./assembly-lines/element-specific/SourceAssemblyLine";
import SpanAssemblyLine from "./assembly-lines/element-specific/SpanAssemblyLine";
import StyleAssemblyLine from "./assembly-lines/element-specific/StyleAssemblyLine";
import TableAssemblyLine from "./assembly-lines/element-specific/TableAssemblyLine";
import TableCaptionAssemblyLine from "./assembly-lines/element-specific/TableCaptionAssemblyLine";
import TextAreaAssemblyLine from "./assembly-lines/element-specific/TextAreaAssemblyLine";
import TitleAssemblyLine from "./assembly-lines/element-specific/TitleAssemblyLine";
import TrackAssemblyLine from "./assembly-lines/element-specific/TrackAssemblyLine";
import UnorderedListAssemblyLine from "./assembly-lines/element-specific/UnorderedListAssemblyLine";
import VideoAssemblyLine from "./assembly-lines/element-specific/VideoAssemblyLine";



export default class ElementFactory {

    public static readonly INSTANCE = new ElementFactory();



    public a<P extends AssemblyLine.Parameters>(defaultParameters: P, href?: Parameters<AnchorAssemblyLine<P>["href"]>[0], openInNewTab?: Parameters<AnchorAssemblyLine<P>["openInNewTab"]>[0]) {
        let out = new AnchorAssemblyLine(defaultParameters);
        if (href !== undefined) out = out.href(href);
        if (openInNewTab !== undefined) out = out.openInNewTab(openInNewTab);

        return out;
    }

    public audio<P extends AssemblyLine.Parameters>(defaultParameters: P, src?: Parameters<AudioAssemblyLine<P>["src"]>[0], doLoop?: Parameters<AudioAssemblyLine<P>["doLoop"]>[0]) {
        let out = new AudioAssemblyLine(defaultParameters);
        if (src !== undefined) out = out.src(src);
        if (doLoop !== undefined) out = out.doLoop(doLoop);

        return out;
    }

    public base<P extends AssemblyLine.Parameters>(defaultParameters: P, href?: Parameters<BaseAssemblyLine<P>["href"]>[0], openInNewTab?: Parameters<BaseAssemblyLine<P>["openInNewTab"]>[0]) {
        let out = new BaseAssemblyLine(defaultParameters);
        if (href !== undefined) out = out.href(href);
        if (openInNewTab !== undefined) out = out.openInNewTab(openInNewTab);

        return out;
    }

    public body<P extends AssemblyLine.Parameters>(defaultParameters: P) {
        return new BodyAssemblyLine(defaultParameters);
    }

    public br<P extends AssemblyLine.Parameters>(defaultParameters: P) {
        return new BRAssemblyLine(defaultParameters);
    }

    public button<P extends AssemblyLine.Parameters>(defaultParameters: P, onClick?: (ev: MouseEvent, self: HTMLButtonElement) => void, doDisable?: Parameters<ButtonAssemblyLine<P>["doDisable"]>[0]) {
        let out = new ButtonAssemblyLine(defaultParameters);
        if (onClick !== undefined) out = out.on("click", onClick);
        if (doDisable !== undefined) out = out.doDisable(doDisable);

        return out;
    }

    public canvas<P extends AssemblyLine.Parameters>(defaultParameters: P, width?: Parameters<CanvasAssemblyLine<P>["width"]>[0], height?: Parameters<CanvasAssemblyLine<P>["height"]>[0]) {
        let out = new CanvasAssemblyLine(defaultParameters);
        if (width !== undefined) out = out.width(width);
        if (height !== undefined) out = out.height(height);

        return out;
    }

    public data<P extends AssemblyLine.Parameters>(defaultParameters: P, value?: Parameters<DataAssemblyLine<P>["value"]>[0]) {
        let out = new DataAssemblyLine(defaultParameters);
        if (value !== undefined) out = out.value(value);

        return out;
    }

    public datalist<P extends AssemblyLine.Parameters>(defaultParameters: P, ...options: Parameters<DataListAssemblyLine<P>["options"]>) {
        let out = new DataListAssemblyLine(defaultParameters);
        if (options) out = out.options(...options);

        return out;
    }

    public dialog<P extends AssemblyLine.Parameters>(defaultParameters: P, isOpen?: Parameters<DialogAssemblyLine<P>["isOpen"]>[0]) {
        let out = new DialogAssemblyLine(defaultParameters);
        if (isOpen !== undefined) out = out.isOpen(isOpen);

        return out;
    }

    public div<P extends AssemblyLine.Parameters>(defaultParameters: P, id?: Parameters<DivAssemblyLine<P>["id"]>[0], ...classes: Parameters<DivAssemblyLine<P>["classes"]>) {
        let out = new DivAssemblyLine(defaultParameters);
        if (id !== undefined) out = out.id(id);
        if (classes) out = out.classes(...classes);

        return out;
    }

    public dl<P extends AssemblyLine.Parameters>(defaultParameters: P) {
        return new DListAssemblyLine(defaultParameters);
    }

    public embed<P extends AssemblyLine.Parameters>(defaultParameters: P) {
        return new EmbedAssemblyLine(defaultParameters);
    }

    public fieldset<P extends AssemblyLine.Parameters>(defaultParameters: P, name?: Parameters<FieldSetAssemblyLine<P>["name"]>[0]) {
        let out = new FieldSetAssemblyLine(defaultParameters);
        if (name !== undefined) out = out.name(name);

        return out;
    }

    public form<P extends AssemblyLine.Parameters>(defaultParameters: P, name?: Parameters<FormAssemblyLine<P>["name"]>[0], method?: Parameters<FormAssemblyLine<P>["method"]>[0]) {
        let out = new FormAssemblyLine(defaultParameters);
        if (name !== undefined) out.name(name);
        if (method !== undefined) out.method(method);

        return out;
    }

    public head<P extends AssemblyLine.Parameters>(defaultParameters: P) {
        return new HeadAssemblyLine(defaultParameters);
    }

    public h1<P extends AssemblyLine.Parameters>(defaultParameters: P, text?: Parameters<HeadingAssemblyLine<P>["text"]>[0]) {
        let out = new HeadingAssemblyLine(1, defaultParameters);
        if (text !== undefined) out = out.text(text);

        return out;
    }

    public h2<P extends AssemblyLine.Parameters>(defaultParameters: P, text?: Parameters<HeadingAssemblyLine<P>["text"]>[0]) {
        let out = new HeadingAssemblyLine(2, defaultParameters);
        if (text !== undefined) out = out.text(text);

        return out;
    }

    public h3<P extends AssemblyLine.Parameters>(defaultParameters: P, text?: Parameters<HeadingAssemblyLine<P>["text"]>[0]) {
        let out = new HeadingAssemblyLine(3, defaultParameters);
        if (text !== undefined) out = out.text(text);

        return out;
    }

    public h4<P extends AssemblyLine.Parameters>(defaultParameters: P, text?: Parameters<HeadingAssemblyLine<P>["text"]>[0]) {
        let out = new HeadingAssemblyLine(4, defaultParameters);
        if (text !== undefined) out = out.text(text);

        return out;
    }

    public h5<P extends AssemblyLine.Parameters>(defaultParameters: P, text?: Parameters<HeadingAssemblyLine<P>["text"]>[0]) {
        let out = new HeadingAssemblyLine(5, defaultParameters);
        if (text !== undefined) out = out.text(text);

        return out;
    }

    public h6<P extends AssemblyLine.Parameters>(defaultParameters: P, text?: Parameters<HeadingAssemblyLine<P>["text"]>[0]) {
        let out = new HeadingAssemblyLine(6, defaultParameters);
        if (text !== undefined) out = out.text(text);

        return out;
    }

    public hr<P extends AssemblyLine.Parameters>(defaultParameters: P) {
        return new HRAssemblyLine(defaultParameters);
    }

    public html<P extends AssemblyLine.Parameters>(defaultParameters: P) {
        return new HTMLAssemblyLine(defaultParameters);
    }

    public iframe<P extends AssemblyLine.Parameters>(defaultParameters: P, src?: Parameters<IFrameAssemblyLine<P>["src"]>[0]) {
        let out = new IFrameAssemblyLine(defaultParameters);
        if (src !== undefined) out = out.src(src);

        return out;
    }

    public img<P extends AssemblyLine.Parameters>(defaultParameters: P, src?: Parameters<ImageAssemblyLine<P>["src"]>[0], alt?: Parameters<ImageAssemblyLine<P>["alt"]>[0]) {
        let out = new ImageAssemblyLine(defaultParameters);
        if (src !== undefined) out = out.src(src);
        if (alt !== undefined) out = out.alt(alt);

        return out;
    }

    public readonly input = InputAssemblyLine.DEFAULT_CREATORS;

    public label<P extends AssemblyLine.Parameters>(defaultParameters: P, forElemOrID?: Parameters<LabelAssemblyLine<P>["for"]>[0]) {
        let out = new LabelAssemblyLine(defaultParameters);
        if (forElemOrID !== undefined) out = out.for(forElemOrID);

        return out;
    }

    public legend<P extends AssemblyLine.Parameters>(defaultParameters: P) {
        return new LegendAssemblyLine(defaultParameters);
    }

    public li<P extends AssemblyLine.Parameters>(defaultParameters: P) {
        return new LIAssemblyLine(defaultParameters);
    }

    public readonly link = LinkAssemblyLine.DEFAULT_CREATORS;

    public menu<P extends AssemblyLine.Parameters>(defaultParameters: P) {
        return new MenuAssemblyLine(defaultParameters);
    }

    public readonly meta = MetaAssemblyLine.DEFAULT_CREATORS;

    public meter<P extends AssemblyLine.Parameters>(defaultParameters: P) {
        return new MeterAssemblyLine(defaultParameters);
    }

    public object<P extends AssemblyLine.Parameters>(defaultParameters: P, type?: Parameters<ObjectAssemblyLine<P>["type"]>[0], data?: Parameters<ObjectAssemblyLine<P>["data"]>[0]) {
        let out = new ObjectAssemblyLine(defaultParameters);
        if (type !== undefined) out = out.type(type);
        if (data !== undefined) out = out.data(data);

        return out;
    }

    public optgroup<V extends string, P extends AssemblyLine.Parameters>(defaultParameters: P, label?: Parameters<OptGroupAssemblyLine<P>["label"]>[0], ...options: OptionAssemblyLine<V, P>[]) {
        let out = new OptGroupAssemblyLine(defaultParameters);
        if (label !== undefined) out = out.label(label);
        return out.options(...options);
    }

    public option<P extends AssemblyLine.Parameters, V extends string>(defaultParameters: P, value: V, text?: Parameters<OptionAssemblyLine<V, P>["text"]>[0]) {
        let out = new OptionAssemblyLine(value, defaultParameters);
        if (text !== undefined) out = out.text(text);

        return out;
    }

    public ol<P extends AssemblyLine.Parameters>(defaultParameters: P, type?: Parameters<OrderedListAssemblyLine<P>["type"]>[0], isReversed?: Parameters<OrderedListAssemblyLine<P>["isReversed"]>[0]) {
        let out = new OrderedListAssemblyLine(defaultParameters);
        if (type !== undefined) out = out.type(type);
        if (isReversed !== undefined) out = out.isReversed(isReversed);

        return out;
    }

    public output<P extends AssemblyLine.Parameters>(defaultParameters: P, value?: Parameters<OutputAssemblyLine<P>["value"]>[0], ...forElementOrIDs: Parameters<OutputAssemblyLine<P>["for"]>) {
        let out = new OutputAssemblyLine(defaultParameters);
        if (value !== undefined) out = out.value(value);
        if (forElementOrIDs) out = out.for(...forElementOrIDs);

        return out;
    }

    public p<P extends AssemblyLine.Parameters>(defaultParameters: P, text?: Parameters<ParagraphAssemblyLine<P>["text"]>[0]) {
        let out = new ParagraphAssemblyLine(defaultParameters);
        if (text !== undefined) out = out.text(text);

        return out;
    }

    public picture<P extends AssemblyLine.Parameters>(defaultParameters: P) {
        return new PictureAssemblyLine(defaultParameters);
    }

    public pre<P extends AssemblyLine.Parameters>(defaultParameters: P) {
        return new PreAssemblyLine(defaultParameters);
    }

    public progress<P extends AssemblyLine.Parameters>(defaultParameters: P, value?: Parameters<ProgressAssemblyLine<P>["value"]>[0], max?: Parameters<ProgressAssemblyLine<P>["max"]>[0]) {
        let out = new ProgressAssemblyLine(defaultParameters);
        if (value !== undefined) out = out.value(value);
        if (max !== undefined) out = out.max(max);

        return out;
    }

    public script<P extends AssemblyLine.Parameters>(defaultParameters: P, type?: Parameters<ScriptAssemblyLine<P>["type"]>[0], src?: Parameters<ScriptAssemblyLine<P>["src"]>[0]) {
        let out = new ScriptAssemblyLine(defaultParameters);
        if (type !== undefined) out = out.type(type);
        if (src !== undefined) out = out.src(src);

        return out;
    }

    public select<V extends string, P extends AssemblyLine.Parameters>(defaultParameters: P, ...options: (OptionAssemblyLine<V, P> | OptGroupAssemblyLine<P, V>)[]) {
        let out = new SelectAssemblyLine(defaultParameters);
        return out.options(...options);
    }

    public source<P extends AssemblyLine.Parameters>(defaultParameters: P, type?: Parameters<SourceAssemblyLine<P>["type"]>[0], src?: Parameters<SourceAssemblyLine<P>["src"]>[0]) {
        let out = new SourceAssemblyLine(defaultParameters);
        if (type !== undefined) out = out.type(type);
        if (src !== undefined) out = out.src(src);

        return out;
    }

    public span<P extends AssemblyLine.Parameters>(defaultParameters: P, style?: Parameters<SpanAssemblyLine<P>["style"]>[0]) {
        let out = new SpanAssemblyLine(defaultParameters);
        if (style !== undefined) out = out.style(style);

        return out;
    }

    public style<P extends AssemblyLine.Parameters>(defaultParameters: P) {
        return new StyleAssemblyLine(defaultParameters);
    }

    public table<P extends AssemblyLine.Parameters>(defaultParameters: P) {
        return new TableAssemblyLine(defaultParameters);
    }

    public caption<P extends AssemblyLine.Parameters>(defaultParameters: P) {
        return new TableCaptionAssemblyLine(defaultParameters);
    }

    public textarea<P extends AssemblyLine.Parameters>(defaultParameters: P, text?: Parameters<TextAreaAssemblyLine<P>["text"]>[0]) {
        let out = new TextAreaAssemblyLine(defaultParameters);
        if (text !== undefined) out = out.text(text);

        return out;
    }

    public title<P extends AssemblyLine.Parameters>(defaultParameters: P, text?: Parameters<TitleAssemblyLine<P>["text"]>[0]) {
        let out = new TitleAssemblyLine(defaultParameters);
        if (text !== undefined) out = out.text(text);

        return out;
    }

    public track<P extends AssemblyLine.Parameters>(defaultParameters: P, kind?: Parameters<TrackAssemblyLine<P>["kind"]>[0], src?: Parameters<TrackAssemblyLine<P>["src"]>[0]) {
        let out = new TrackAssemblyLine(defaultParameters);
        if (kind !== undefined) out = out.kind(kind);
        if (src !== undefined) out = out.src(src);

        return out;
    }

    public ul<P extends AssemblyLine.Parameters>(defaultParameters: P, type?: Parameters<UnorderedListAssemblyLine<P>["type"]>[0]) {
        let out = new UnorderedListAssemblyLine(defaultParameters);
        if (type !== undefined) out = out.type(type);

        return out;
    }

    public video<P extends AssemblyLine.Parameters>(defaultParameters: P) {
        return new VideoAssemblyLine(defaultParameters);
    }

}