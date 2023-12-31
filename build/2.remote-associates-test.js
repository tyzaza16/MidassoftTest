"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuestionPart = void 0;
function getQuestionPart(phrases) {
    if (phrases.length <= 1) {
        throw new Error(`can't calculate. require phrases length more than 2`);
    }
    const commonWord = findCommonWord(phrases);
    if (!commonWord.length) {
        throw new Error('common word not found!');
    }
    let answer = [];
    for (let phrase of phrases) {
        const answerPharase = phrase.replace(commonWord, '').trim();
        answer.push(answerPharase);
    }
    return answer;
}
exports.getQuestionPart = getQuestionPart;
function findCommonWord(phrases) {
    let answerWord = '';
    let keyword = '';
    let keywordInverted = '';
    let keywordFlag = true;
    let keywordInvertedFlag = true;
    const lastRound = phrases.length - 1;
    for (let i = 0; i < phrases[0].length; i++) {
        keyword = phrases[0].slice(i); // BEFRIEND, EFRIEND, FRIEND
        keywordInverted = phrases[0].slice(0, i + 1); // BEFRIEND, BEFRIEN, BEFRI
        for (let j = 1; j < phrases.length; j++) {
            // SKIP ROUNDED
            if ((phrases[j].indexOf(keyword)) === -1 &&
                (phrases[j].indexOf(keywordInverted)) === -1) {
                break;
            }
            // SET FLAG FOR KEYWORD
            if ((phrases[j].indexOf(keyword)) === -1) {
                keywordFlag = false;
            }
            //SET FLAG FOR KEYWORDINVERTED
            if ((phrases[j].indexOf(keywordInverted)) === -1) {
                keywordInvertedFlag = false;
            }
            // CHECK CONDITION FOR KEYWORD
            if ((phrases[j].indexOf(keyword)) >= 0 &&
                keyword.length > answerWord.length &&
                keywordFlag && j === lastRound) {
                answerWord = keyword;
            }
            // CHECK CONDITION FOR KEYWORDINVERTED
            if ((phrases[j].indexOf(keywordInverted)) >= 0 &&
                keywordInverted.length > answerWord.length &&
                keywordInvertedFlag && j === lastRound) {
                answerWord = keywordInverted;
            }
        }
        //RESET FLAG
        keywordFlag = true;
        keywordInvertedFlag = true;
    }
    return answerWord.trim();
}
