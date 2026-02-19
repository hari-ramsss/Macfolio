import WindowWrapper from "#hoc/WindowWrapper"
import { WindowControlls } from "#components"
import useWindowStore from "#store/window"

const Image = () => {
    const { windows } = useWindowStore();
    const data = windows.imgfile?.data;

    if (!data) return null;

    return (
        <>
            <div id="window-header">
                <WindowControlls target="imgfile" />
                <h2>{data.name}</h2>
            </div>
            <div className="p-4 flex items-center justify-center h-full overflow-auto bg-white dark:bg-gray-900">
                <img
                    src={data.imageUrl}
                    alt={data.name}
                    className="max-w-full max-h-full object-contain rounded-lg shadow-lg dark:shadow-gray-950"
                />
            </div>
        </>
    )
}

const ImageWindow = WindowWrapper(Image, "imgfile")
export default ImageWindow
