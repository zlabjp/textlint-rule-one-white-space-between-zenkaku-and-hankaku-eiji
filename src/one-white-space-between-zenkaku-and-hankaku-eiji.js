/**
 * Copyright 2016, Z Lab Corporation. All rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

"use strict";

import { RuleHelper } from "textlint-rule-helper";

const ZEN_HAN = /(?:[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]|[\uD840-\uD87F][\uDC00-\uDFFF]|[ぁ-んァ-ヶ])[A-Za-z]/;
const HAN_ZEN = /[A-Za-z](?:[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]|[\uD840-\uD87F][\uDC00-\uDFFF]|[ぁ-んァ-ヶ])/;
const ALLOW_CHARS = ["、", "。", "「", "」", "（", "）", "｛", "｝", "【", "】", "『", "』"];

export default context => {
    const helper = new RuleHelper(context);
    const { Syntax, getSource, RuleError, report } = context;

    return {
        [Syntax.Str](node) {
            if (helper.isChildNode(node, [Syntax.Link, Syntax.Image, Syntax.BlockQuote])) {
                return;
            }

            const text = getSource(node);
            let err = false;
            let matches, index, c;

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
                report(node, new RuleError("全角文字と半角英字の間に半角スペースを入れます。", { index }));
            }
        }
    };
};
