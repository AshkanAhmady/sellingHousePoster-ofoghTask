import DeletePosterModal from "components/DeleteDialog";
import Loading from "components/Loading";
import MapComponent from "components/MapComponent";
import { useUser } from "context/authContext/UserProvider";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteSinglePoster, getSinglePoster } from "requests/poster/posterRequests";
import { PosterType } from "types";

const SinglePosterPage = () => {
    const { id } = useParams()
    const [poster, setPoster] = useState<PosterType | null>(null)
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [loading, setLoading] = useState(false)
    const user = useUser()
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
        getSinglePoster(id).then((data) => {
            setLoading(false)
            setPoster(data)
        })
    }, [id])

    const confilrmDelete = () => {
        deleteSinglePoster(poster?.id).then(() => {
            toast.success("آگهی با موفقیت حذف شد")
            navigate("/")
        })
    }

    if (loading) return <Loading />
    return (
        <div className="mt-6 flex justify-center">
            <div className="bg-white rounded-xl shadow-lg flex gap-4 flex-col w-full md:w-[40%] p-4">
                <div className="w-[100%] gap-1 flex flex-col min-h-[30px]">
                    <div className="flex gap-2 items-start">
                        <h1 className="font-bold tex-md">مشخصات خانه:</h1>
                        <span className="font-light text-sm">{poster?.homeDesc}</span>
                    </div>
                    <div className="flex gap-2 items-start">
                        <h1 className="font-bold tex-md">آدرس:</h1>
                        <span className="font-light text-sm">{poster?.address}</span>
                    </div>
                    {poster?.description && <div className="flex gap-2 items-start">
                        <h1 className="font-bold tex-md">توضیحات:</h1>
                        <span className="font-light text-sm">{poster?.description}</span>
                    </div>}
                    <div className="flex gap-2 items-start">
                        <h1 className="font-bold tex-md">نام مالک:</h1>
                        <span className="font-light text-sm">{`${poster?.name} ${poster?.lastName}`}</span>
                    </div>
                    <div className="flex gap-2 items-start">
                        <h1 className="font-bold tex-md">شماره تماس:</h1>
                        <span className="font-light text-sm">{poster?.phoneNumber}</span>
                    </div>
                </div>
                <div className="h-[350px] shadow-lg rounded-md overflow-hidden w-[100%]">
                    <MapComponent location={poster?.location} zoom={17} isZoomable={false} isDrageble={false} setLocation={null} />
                </div>
                {user?.userId === poster?.userId && <div className="w-full flex gap-2">
                    <button className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white flex-1 cursor-pointer  px-7 py-1 rounded-md"
                    >ویرایش</button>
                    <button onClick={() => setShowDeleteModal(true)} className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white flex-1 cursor-pointer px-7 py-1 rounded-md">حذف</button>
                </div>}

            </div>
            <DeletePosterModal onDelete={confilrmDelete} showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} />
        </div>
    );
}

export default SinglePosterPage;


