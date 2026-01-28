import WindowWrapper from "#hoc/WindowWrapper"
import { WindowControlls } from "#components"
import { FileType, Mail, Search } from "lucide-react"
import { gallery, photosLinks } from "#constants"
import useWindowStore from "#store/window"
const Photos = () => {
  const {openWindow} = useWindowStore()
  return (
    <>
      <div id="window-header">
        <WindowControlls target="photos" />
        <div className="w-full flex justify-end items-center gap-3 text-gray-500">
          <Mail className="icon" />
          <Search className="icon" />
        </div>
      </div>
      <div className="flex w-full">
        <div className="sidebar">
          <div>
            <h2>Photos</h2>
            <ul>
              {photosLinks.map(({ id, icon, title }) => (
                <li key={id}>
                  <img src={icon} alt={title} />
                  <p>{title}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="gallery">
          <ul>
            {gallery.map(({ id, img }) => (
              <li key={id} onClick={()=>openWindow("imgfile",{
                id,name:"Gallery image",icon:"/images/image.png",kind:"file",FileType:"img",imageUrl:img,
              })}>
                <img src={img} alt={`Gallery ${id}`} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
const PhotosWindow = WindowWrapper(Photos, "photos")

export default PhotosWindow