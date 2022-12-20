import { AiOutlineArrowUp } from "react-icons/ai";

export const BtnScrollToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <div className={'tooltip fixed lg:right-16 lg:bottom-12 right-10 bottom-8'} data-tip={'최상단으로 이동'}>
      <button className={ 'border rounded-full hover:bg-blue-400 hover:text-white transition duration-200' } onClick={ scrollToTop } >
        <AiOutlineArrowUp className={ 'p-3 lg:w-16 lg:h-16 w-12 h-12' } />
      </button>
    </div>
  )
}