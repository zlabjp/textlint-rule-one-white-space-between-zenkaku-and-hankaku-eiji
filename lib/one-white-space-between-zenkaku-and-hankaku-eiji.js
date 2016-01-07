/**
 * Copyright 2016, Z Lab Corporation. All rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

"use strict";

var ZEN_HAN = /(?:[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]|[\uD840-\uD87F][\uDC00-\uDFFF]|[ぁ-んァ-ヶ])[A-Za-z]/,
    HAN_ZEN = /[A-Za-z](?:[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]|[\uD840-\uD87F][\uDC00-\uDFFF]|[ぁ-んァ-ヶ])/,
    ALLOW_CHARS = ["、", "。", "「", "」", "（", "）", "｛", "｝", "【", "】", "『", "』"];

module.exports = function oneWhiteSpaceBetweenZenkakuAndHankaku(context) {
    var exports = {};

    exports[context.Syntax.Str] = function (node) {
        var text = context.getSource(node),
            err = false,
            matches,
            index,
            c;

        matches = text.match(ZEN_HAN);
        if (matches) {
            index = matches.index + 1;
            c = matches[0][0];
            if (ALLOW_CHARS.indexOf(c) < 0 && c !== " ") {
                err = true;
            }
        } else {
            matches = text.match(HAN_ZEN);
            if (matches) {
                index = matches.index;
                c = matches[0][1];
                if (ALLOW_CHARS.indexOf(c) < 0 && c !== " ") {
                    err = true;
                }
            }
        }

        if (err) {
            context.report(node, new context.RuleError("全角文字と半角英字の間に半角スペースを入れます。", index));
        }
    };

    return exports;
};
