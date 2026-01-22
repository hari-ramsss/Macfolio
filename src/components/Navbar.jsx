import dayjs from "dayjs";

import { navLinks, navIcons } from "#constants";

const Navbar = () => {
    console.log(navLinks);
  return (
    <nav>
        <div>
            <img src="/images/logo.svg" alt="logo" />
            <p className="font-bold">Hari Ram's Portfolio</p>
        
        <ul>
            {navLinks.map((item)=>{
                return(
                    <li key={item.id}><p>{item.name}</p></li>
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