const PicturePreview = ({url, heading})=>{
    return (
        <div className="">
            {url&&<div>
                <h1 className="my-2 text-base capitalize">{heading}</h1>
                <div className="preview-image">
                    <img src={url} alt="picture" className="w-full h-full object-cover"/>
                </div>
                </div>}
        </div>
    )
}

export default PicturePreview;