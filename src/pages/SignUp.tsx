import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  id: string;
  pw: string;
  pwRequired: string;
  email: string;
  nickName: string;
};

export default function SignUp() {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  // console.log(
  //   `id : ${watch("id")} pw : ${watch("pw")}`,
  //   "pwReq : ",
  //   watch("pwRequired"),
  //   "email : ",
  //   watch("email"),
  //   "nickname : ",
  //   watch("nickName")
  // ); // watch input value by passing the name of it

  //<div className='flex items-center w-full mt-6 border-2'>
  return (
    <div className='p-5 '>
      <form className='max-w-md mx-auto' onSubmit={handleSubmit(onSubmit)}>
        <h1 className='text-center sm:text-xl md:text-3xl mb-7'>회원가입</h1>
        <div className='relative z-0 w-full mb-5 group'>
          <input
            type='text'
            id='floating_id'
            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            placeholder=' '
            {...register('id', {
              required: '필수 항목입니다.',
              pattern: {
                value: /^[a-z]+[a-z0-9]{5,19}$/g,
                message: '영문자로 시작, 영문자 + 숫자 6~20자 ',
              },
            })}
          />
          <label
            htmlFor='floating_id'
            className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
          >
            아이디
          </label>
          <button
            type='button'
            className='absolute top-0 right-0 btn btn-outline sm:btn-xs md:btn-sm'
          >
            중복검사
          </button>
          {errors.id && <span className='text-red-700 '>{errors.id.message}</span>}
        </div>
        <div className='relative z-0 w-full mb-5 group'>
          <input
            type='password'
            id='floating_password'
            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            placeholder=' '
            {...register('pw', {
              required: '필수 항목입니다.',
              pattern: {
                value: /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/,
                message: '8 ~ 16자 영문, 숫자 조합',
              },
            })}
          />
          <label
            htmlFor='floating_password'
            className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
          >
            비밀번호
          </label>
          {errors.pw && <span className='text-red-700 '>{errors.pw.message}</span>}
        </div>
        <div className='relative z-0 w-full mb-5 group'>
          <input
            type='password'
            id='floating_repeat_password'
            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            placeholder=' '
            {...register('pwRequired', {
              required: '비밀번호를 다시 입력해주세요.',
              minLength: { message: '최소 5자 이상 입력해주세요.', value: 5 },
              maxLength: {
                message: '최대 20자까지만 입력해주세요.',
                value: 20,
              },
              pattern: {
                value: /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/,
                message: '8 ~ 16자 영문, 숫자 조합',
              },
            })}
          />
          <label
            htmlFor='floating_repeat_password'
            className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
          >
            비밀번호 확인
          </label>
          {errors.pwRequired && <span className='text-red-700 '>{errors.pwRequired.message}</span>}
        </div>

        <div className='relative z-0 w-full mb-5 group'>
          <input
            type='email'
            id='floating_repeat_email'
            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            placeholder=' '
            {...register('email', {
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: '이메일 형식을 지켜주세요.',
              },
              required: '필수 항목입니다.',
            })}
          />
          <label
            htmlFor='floating_repeat_email'
            className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
          >
            이메일
          </label>
          <button
            type='button'
            className='absolute top-0 right-0 btn btn-outline sm:btn-xs md:btn-sm'
          >
            이메일 인증
          </button>
          {errors.email && <span className='text-red-700 '>{errors.email.message}</span>}
        </div>

        <div className='relative z-0 w-full mb-5 group'>
          <input
            type='text'
            id='floating_repeat_nickname'
            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            placeholder=' '
            {...register('nickName', {
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: '2자 이상 16자 이하, 영어 또는 숫자 또는 한글로 구성',
              },
              required: '필수 항목입니다.',
            })}
          />
          <label
            htmlFor='floating_repeat_nickname'
            className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
          >
            닉네임
          </label>
          {errors.nickName && <span className='text-red-700 '>{errors.nickName.message}</span>}
        </div>

        <button className='sm:btn-sm md:btn-md btn btn-outline'>회원가입</button>
      </form>
    </div>
  );
}
