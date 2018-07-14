import React from "react"

const questionsAndAnswers = [
    {
        question: '关于 Crypto Heart',
        answer: " 跟 Frank 交朋友，即有机会获得 Frank 送出的一颗 Tokenized 的 ❤️（代币代号 HRT）"
    },
    {
        question: '如何获得 HRT',
        answer: "目前该代币只有 Frank 被邀请的朋友才可获得"
    },
    {
        question: '什么是 ERC20 Standard Token',
        answer: "ERC20 是以太坊平台的一个「同质性代币」的标准，利用 ERC20 规范， 所有人都可以发行自己的 Token。"
    }
]

function QuestionAndAnswer({question, answer}) {
    return (
        <div className="qna">
            <h1 class="title"> {question} ? </h1>
            <p class="subtitle"> {answer} </p>
        </div>
    )
}

export function About({siteName}) {
    return (<div className="about">
        <h1 class="title medium"> 关于本站 </h1>
        {
            questionsAndAnswers.map(
                (props) => <QuestionAndAnswer {...props} />
            )
        }
    </div>)
}

