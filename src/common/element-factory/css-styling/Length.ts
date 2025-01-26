type Unit =
    "cap" |
    "ch" |
    "em" |
    "ex" |
    "ic" |
    "lh" |

    "rcap" |
    "rch" |
    "rem" |
    "rex" |
    "ric" |
    "rlh" |

    "vh" |
    "vw" |
    "vmax" |
    "vmin" |
    "vb" |
    "vi" |

    "cqw" |
    "cqh" |
    "cqi" |
    "cqb" |
    "cqmin" |
    "cqmax" |

    "px" |
    "cm" |
    "mm" |
    'Q' |
    "in" |
    "pc" |
    "pt";

type Length = `${number}${Unit}`;
export default Length;