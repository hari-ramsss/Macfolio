import WindowWrapper from "#hoc/WindowWrapper"
import { WindowControlls } from "#components"
import useWindowStore from "#store/window"

const Text = () => {
    const { windows } = useWindowStore();
    const data = windows.txtfile?.data;

    if (!data) return null;

    return (
        <>
            <div id="window-header">
                <WindowControlls target="txtfile" />
                <h2>{data.name}</h2>
            </div>
            <div className="p-6 flex flex-col gap-4 overflow-y-auto h-full">
                {data.image && (
                    <img
                        src={data.image}
                        alt={data.name}
                        className="w-32 h-32 rounded-lg object-cover"
                    />
                )}
                <div className="flex flex-col gap-3">
                    {data.subtitle && (
                        <h3 className="text-lg font-semibold text-gray-800">{data.subtitle}</h3>
                    )}
                    {data.description?.map((paragraph, index) => (
                        <p key={index} className="text-sm text-gray-600 leading-relaxed">
                            {paragraph}
                        </p>
                    ))}
                </div>
            </div>
        </>
    )
}

const TextWindow = WindowWrapper(Text, "txtfile")
export default TextWindow
