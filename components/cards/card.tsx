import {NextPage} from "next";
import {HiUserCircle} from "react-icons/hi";

interface CardProps {
    icon?: any;
    name?: string;
    badgeDesc?: string;
    badgeColor?: 'badge-primary' | 'badge-secondary' | 'badge-accent' | 'badge-ghost' | 'badge-info' | 'badge-success' | 'badge-warning' | 'badge-error';
    tags?: string[];
}

/**
 * 카드 컴포넌트
 * @param icon 아이콘 컴포넌트 (w-64, h-64)
 * @param name 이름
 * @param badgeDesc 배지 설명
 * @param badgeColor 배지 색상
 * @param tags 태그 리스트
 * @constructor
 */
export const Card: NextPage<CardProps> = ({ icon, name, badgeDesc, badgeColor, tags }) => {

    return (
        <div className="card h-auto w-80 bg-base-100 shadow-xl hover:bg-gray-200 hover:duration-200 active:bg-gray-300 transition hover:-translate-y-2">
            <figure>{ icon === undefined ? <HiUserCircle className={ 'w-64 h-64' }/> : icon }</figure>
            <div className="card-body">
                <h2 className="card-title">
                    { name }
                    {
                        badgeDesc === undefined ?
                            null :
                            <div className={ badgeColor === undefined ? 'badge' : 'badge ' + badgeColor }>{ badgeDesc }</div>
                    }
                </h2>
                <div className="card-actions mt-2">
                    {
                        tags?.map((eachTag, idx) => {
                            return <div key={ idx } className="badge badge-outline">{ eachTag }</div>
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default Card;