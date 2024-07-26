import { useEffect, useRef, useState } from "react"
import "../style/AutoComplete.scss"

export default function AutoCompletInput({ label, data, value, setValue }){

    const [menu, setMenu] = useState(data)
    const [isShowMenu, setIsShowMenu] = useState(false)
    const inputElement = useRef(null)

    const filterMenu = keyword => {
        const newMenu = []

        for (let item of data){
            if (item.toLowerCase().includes(keyword.toLowerCase())){
                newMenu.push(item)
            }
        }

        setMenu(newMenu)
    }

    const handleClickItem = item => {
        setValue(item)
    }

    useEffect(() => {
        setIsShowMenu(value === "" ? false : true)

        filterMenu(value)
    }, [value])

    useEffect(() => {
        document.addEventListener("click", (e) => {
            if (!inputElement.current?.contains(e.target)){
                setIsShowMenu(false)
            }
        })
    })

    return (
        <div className="autocomplete">
            <div className="input" ref={inputElement}>
                <input type="text" placeholder={label} value={value} onChange={(e) => setValue(e.target.value)} />
            </div>
            <div className={`menu ${isShowMenu ? "active" : ""}`}>
            {
                menu.map((item, index) => (
                    <div className="item" key={index} onClick={() => handleClickItem(item)}>{item}</div>
                ))
            }
            </div>
        </div>
    )
}