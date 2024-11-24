
function Hashtag({company,onClick,}:{company:string, onClick:(filter:string)=>void}) {
  return (
    <li>
    <button onClick={()=>onClick(company)}>#{company}</button>
  </li>
  )
}

export default Hashtag