import { NextPage } from "next";
import { HiUserCircle } from "react-icons/hi";
import Image from "next/image";
import { ENDPOINT } from "../../constants/api.constant";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { FaEllipsisV } from "react-icons/fa";
import CoworkerApi from "../../apis/coworker.api";
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

interface CardProps {
  id: number;
  profileImage?: any;
  name?: string;
  badgeDesc?: string;
  badgeColor?:
    | "badge-primary"
    | "badge-secondary"
    | "badge-accent"
    | "badge-ghost"
    | "badge-info"
    | "badge-success"
    | "badge-warning"
    | "badge-error"
    | string;
  tags?: string[];
  handler: () => void;
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
export const Card: NextPage<CardProps> = ({
  id,
  profileImage,
  name,
  badgeDesc,
  badgeColor,
  tags,
  handler
}) => {

  const router = useRouter();

  // 수정
  const handleUpdateClick = () => {
    router.push(`/people/${id}`);
  }

  // 삭제
  const handleDeleteClick = () => {
    toast.success('함께한 개발자가 삭제되었습니다.');
    CoworkerApi.delete(id).then(() => handler());
  }

  const handleMoveToWikiClick = () => {
    router.push(`/people/wiki/${id}`)
  }

  return (
    <div className="card h-auto w-80 bg-base-100 shadow-xl transition hover:-translate-y-2 cursor-pointer" onClick={ handleMoveToWikiClick }>
      <div className={"flex justify-end p-2"}>
        <div
          className="dropdown dropdown-left"
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <label
            tabIndex={0}
            className="btn btn-circle btn-ghost btn-sm text-gray-500"
          >
            <FaEllipsisV className={'w-4 h-4'} />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a onClick={ handleUpdateClick }><AiFillEdit />수정</a>
            </li>
            <li>
              <a onClick={ handleDeleteClick }><AiFillDelete />삭제</a>
            </li>
          </ul>
        </div>
      </div>
      <div className={"flex justify-center"}>
        <div className={"h-64"}>
          {profileImage === undefined ? (
            <HiUserCircle size={"100%"} />
          ) : (
            <div className={"relative p-28 mt-4"}>
              <Image
                className={"rounded-full"}
                src={`${ENDPOINT}/${profileImage}`}
                layout={"fill"}
                objectFit={"cover"}
              />
            </div>
          )}
        </div>
      </div>

      <div className="card-body">
        <h2 className="card-title">
          {name}
          {badgeDesc === undefined ? null : (
            <div
              className={
                badgeColor === undefined ? "badge" : "badge " + badgeColor
              }
            >
              {badgeDesc}
            </div>
          )}
        </h2>
        <div className="card-actions mt-2">
          {tags?.map((eachTag, idx) => {
            return (
              <div key={idx} className="border px-2 border-black rounded-xl text-sm h-auto">
                {eachTag}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Card;
