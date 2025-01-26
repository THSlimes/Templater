type Unit =
    "dpi" |
    "dpcm" |
    "dppx" |
    'x';

type Resolution = `${number}${Unit}`;
export default Resolution;