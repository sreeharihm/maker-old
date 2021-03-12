export class FormFields {
    public value: any;
    public uniqueId: string;
    public key: string;
    public label: string;
    public type: string;
    public title: string;
    public left: Number;
    public top: Number;
    public height: Number;
    public width: Number;
    public isGraphicHidden: boolean;
    public isSelected: boolean;
    public selectedFile: string;
    public fontIndex: Number;
    public colorIndex: Number;
    public alignIndex: Number;
    public sizeIndex: Number;
    public isBold: Boolean
    public isItalic: Boolean
    public fontSize: Number;
    public tColor: string;
    public bColor: string;
    constructor(options: {
        value?: any,
        key?: string,
        uniqueId?: string,
        label?: string,        
        type?: string,
        title?: string,
        left?: Number,
        top?: Number, 
        height?: Number,
        width?: Number,
        isGraphicHidden?: boolean,
        isSelected?: boolean,   
        selectedFile?: string,
        fontIndex?: Number,
        colorIndex?: Number,
        alignIndex?: Number,       
        sizeIndex?: Number,
        isBold?: boolean,
        isItalic?: boolean,
        fontSize?: Number,
        tColor?: string,
        bColor?: string,
    } = {} ) {
        this.value = options.value || '';
        this.key = options.key ? options.key : options.key || '';
        this.uniqueId = options.uniqueId || '';        
        this.label = options.uniqueId || '';
        this.type = options.uniqueId || '';
        this.title = options.title || '';
        this.left = options.left || 0;
        this.top = options.top || 0;
        this.height = options.height || 0;
        this.width = options.width || 0;
        this.isGraphicHidden = options.isGraphicHidden || false; 
        this.isSelected = options.isSelected || false;
        this.fontIndex = options.fontIndex || 0;
        this.colorIndex = options.colorIndex || 0;
        this.alignIndex = options.alignIndex || 0;
        this.sizeIndex = options.sizeIndex || 0;
        this.isBold = options.isBold || false;
        this.isItalic = options.isItalic || false;
        this.fontSize = options.fontSize || 0;        
        this.tColor = options.tColor || '';
        this.bColor = options.bColor || '';
    }
}