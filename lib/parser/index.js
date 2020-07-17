"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoORImage = void 0;
// return video if it's video url formate , image ...
// warning currently only detecting common formats
exports.videoORImage = (link) => {
    const response = link.match(/(mp4|jpg|png|jpeg|webp)/g);
    if (response) {
        switch (response[0]) {
            case "mp4":
                return "video";
            default:
                return "image";
        }
    }
    else {
        return null;
    }
};
//# sourceMappingURL=index.js.map