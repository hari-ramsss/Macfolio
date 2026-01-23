import dayjs from "dayjs";

import { navLinks, navIcons } from "#constants";
import useWindowStore  from "#store/window";
const Navbar = () => {
    const {openWindow} = useWindowStore();
  return (
    <nav>
        <div>
            <img src="/images/logo.svg" alt="logo" />
            <p className="font-bold">Hari Ram's Portfolio</p>
        
        <ul>
            {navLinks.map(({name,type,id})=>{
                return(
                    <li key={id} onClick={()=>openWindow(type)}><p>{name}</p></li>
                )
            })}
        </ul>
        </div>
        <div>
            <ul>
                {navIcons.map((item)=>{
                    return(
                        <li key={item.id}><img src={item.img} alt="icon" /></li>
                    )
                })}
            </ul>
            <time>{dayjs().format("ddd MMM D h:mm A")}</time>
        </div>
    </nav>
  )
}

export default Navbar