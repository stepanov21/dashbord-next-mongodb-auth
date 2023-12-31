const FormHeader = () => {
  return (
    <div className="w-full grid grid-cols-[1.5fr_1fr_1fr_2fr_min-content] rounded-xl px-5 pb-1 mt-2 opacity-40 sm:hidden">
      <span className="overflow-hidden overflow-ellipsis">Название</span>
      <span className="text-center overflow-hidden overflow-ellipsis">
        Колличество
      </span>
      <span className="text-center  overflow-hidden overflow-ellipsis">
        Цена
      </span>
      <span className="text-center overflow-hidden overflow-ellipsis">
        Категория
      </span>
      <span className="w-[25px] h-[25px]"></span>
    </div>
  );
};

export default FormHeader;
