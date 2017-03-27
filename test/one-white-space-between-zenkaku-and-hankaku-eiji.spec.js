/**
 * Copyright 2016, Z Lab Corporation. All rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

"use strict";

import TextLintTester from "textlint-tester";
const tester = new TextLintTester();

import rule from "../src/one-white-space-between-zenkaku-and-hankaku-eiji.js";

tester.run("one-white-space-between-zenkaku-and-hankaku-eiji", rule, {
    valid: [
        "日本では、1月1日の元日のみを国民の祝日としている。",
        "ハローワールド Hello World ハローワールド",
        "。Hello World、",
        "「Hello World」",
        "「Hello World」",
        "、Hello World。",
        "（Hello World）",
        "『Hello World』",
        "【Hello World】"
    ],
    invalid: [
        {
            text: "ハローワールドHello World",
            errors: [
                {
                    message: "全角文字と半角英字の間に半角スペースを入れます。",
                    index: 1,
                    column: 8
                }
            ]
        },
        {
            text: "Hello Worldハローワールド",
            errors: [
                {
                    message: "全角文字と半角英字の間に半角スペースを入れます。",
                    index: 1,
                    column: 11
                }
            ]
        }
    ]
});
