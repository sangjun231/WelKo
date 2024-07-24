import Image from 'next/image';
import { ChangeEvent, useEffect, useState } from 'react';

const Write = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [maxPeople, setMaxPeople] = useState<number>(0);
  const [price, setPrice] = useState(0);
  const [tag, setTag] = useState<string[]>([]);
  const tags = [
    '체험과 액티비티',
    '유명 핫플레이스',
    '자연과 함께',
    '관광지도 갈래요',
    '현적하고 여유롭게',
    '쇼핑 할래요',
    '맛집은 필수',
    '문화 예술 탐방'
  ];
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const prices = ['숙소비 포함', '식사비 포함', '레저비 포함', '교통비 포함'];

  //이미지 추가하는 핸들러
  const handleImageAdd = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  //최대 인원 추가하는 핸들러, value 값을 숫자로 저장하는 핸들러
  const handleMaxPeopleAdd = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10); // 10진수로 변환
    if (!isNaN(value)) {
      setMaxPeople(value);
    }
  };
  //투어 금액 추가하는 핸들러, value 값을 숫자로 저장하는 핸들러
  const handlePriceAdd = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10); // 10진수로 변환
    if (!isNaN(value)) {
      setPrice(value);
    }
  };
  //태그 선택하는 핸들러
  const toggleTag = (item: string) => {
    if (tag.includes(item)) {
      setTag(tag.filter((i) => i !== item));
    } else {
      setTag([...tag, item]);
    }
  };
  //포함되는 비용 선택하는 핸들러
  const togglePrice = (item: string) => {
    if (selectedPrices.includes(item)) {
      setSelectedPrices(selectedPrices.filter((i) => i !== item));
    } else {
      setSelectedPrices([...selectedPrices, item]);
    }
  };

  useEffect(() => {
    console.log('선택한 태그:', tag);
    console.log('비용 체크:', selectedPrices);
  }, [tag, selectedPrices]);

  return (
    <div>
      {/* 제목, 내용 입력 폼 */}
      <form className="flex flex-col">
        <label>제목</label>
        <input
          className="border"
          type="text"
          placeholder="투어 제목을 작성해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>내용</label>
        <textarea
          className="h-[150px] resize-none border"
          placeholder="투어 내용을 작성해주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </form>
      {/* 이미지 등록 */}
      <div>
        <div className="flex items-center">
          <label
            htmlFor="input-file"
            className="flex h-[150px] w-[150px] cursor-pointer items-center justify-center border"
          >
            <Image src="/icons/upload.png" alt="upload icon" width={70} height={70} />
          </label>
          {image && <Image src={image} alt="uploaded" width={150} height={150} className="border p-2" />}
        </div>
        <input type="file" id="input-file" onChange={handleImageAdd} className="hidden" />
      </div>

      {/* 최대 인원 작성 */}
      <hr className="my-5" />
      <div>
        <h1>최대 인원</h1>
        <input type="number" value={maxPeople} onChange={handleMaxPeopleAdd} min={1} />명
      </div>

      {/* 투어 태그 선택 */}
      <hr className="my-5" />
      <div>
        <h1>어떤 투어인가요?</h1>
        <div className="flex flex-wrap gap-2">
          {tags.map((item) => (
            <button
              key={item}
              className={`rounded-full border px-4 py-2 ${tag.includes(item) ? 'bg-gray-200' : 'bg-white'}`}
              onClick={() => toggleTag(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* 투어 금액 작성 및 체크박스 선택 */}
      <hr className="my-5" />
      <div>
        <h1>투어 금액</h1>
        <input type="number" value={price} onChange={handlePriceAdd} min={0} />원
        <div className="flex flex-wrap">
          {prices.map((item) => (
            <label key={item} className="mr-4">
              <input
                type="checkbox"
                checked={selectedPrices.includes(item)}
                onChange={() => togglePrice(item)}
                className="mr-2"
              />
              {item}
            </label>
          ))}
        </div>
      </div>

      <button className="my-4 rounded bg-black p-2 text-white">저장하기</button>
    </div>
  );
};

export default Write;
