import './ButtonLevel.css'

export default function ButtonLevel({ children, ...props }) {

  return (
    <button {...props} className='lv-btn'>{children}</button>
  )
}
