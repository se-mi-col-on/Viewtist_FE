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

  return (
    <div className='flex items-center mt-6 '>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col items-center w-1/2 p-3 m-auto border-2 rounded-lg'
      >
        <h1 className='mb-3 text-3xl'>회원가입</h1>
        <label className='w-full max-w-xs form-control'>
          <div className='label'>
            <span className='font-bold label-text'>아이디</span>
          </div>
          <input
            type='text'
            placeholder='Type here'
            className={`input input-bordered  ${
              (errors.id && 'border-red-700',
              errors.id ? 'focus:border-red-700' : 'focus:border-green-500')
            }`}
            {...register('id', {
              required: '아이디를 입력해주세요.',
              pattern: {
                value: /^[a-z]+[a-z0-9]{5,19}$/g,
                message: '영문자로 시작, 영문자 + 숫자 6~20자 ',
              },
            })}
          />
          {errors.id && <span className='text-red-700'>{errors.id.message}</span>}
        </label>

        <label className='w-full max-w-xs form-control'>
          <div className='label'>
            <span className='font-bold label-text'>비밀번호</span>
          </div>
          <input
            type='password'
            placeholder='Type here'
            className={`input input-bordered  ${
              (errors.pw && 'border-red-700',
              errors.pw ? 'focus:border-red-700' : 'focus:border-green-500')
            }`}
            {...register('pw', {
              required: '비밀번호를 입력해주세요.',
              pattern: {
                value: /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/,
                message: '8 ~ 16자 영문, 숫자 조합',
              },
            })}
          />
          {errors.pw && <span className='text-red-700'>{errors.pw.message}</span>}
        </label>

        <label className='w-full max-w-xs form-control'>
          <div className='label'>
            <span className='font-bold label-text'>비밀번호 확인</span>
          </div>
          <input
            type='password'
            placeholder='Type here'
            className={`input input-bordered  ${
              (errors.pwRequired && 'border-red-700',
              errors.pwRequired ? 'focus:border-red-700' : 'focus:border-green-500')
            }`}
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
          {errors.pwRequired && <span className='text-red-700'>{errors.pwRequired.message}</span>}
        </label>

        <label className='w-full max-w-xs form-control'>
          <div className='label'>
            <span className='font-bold label-text'>이메일</span>
          </div>
          <input
            type='email'
            placeholder='Type here'
            className={`input input-bordered  ${
              (errors.email && 'border-red-700',
              errors.email ? 'focus:border-red-700' : 'focus:border-green-500')
            }`}
            {...register('email', {
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: '이메일 형식을 지켜주세요.',
              },
              required:"필수 항목입니다."
            })}
          />
          {errors.email && <span className='text-red-700'>{errors.email.message}</span>}
        </label>

        <label className='w-full max-w-xs form-control'>
          <div className='label'>
            <span className='font-bold label-text'>닉네임</span>
          </div>
          <input
            type='text'
            placeholder='Type here'
            className={`input input-bordered  ${
              (errors.nickName && 'border-red-700',
              errors.nickName ? 'focus:border-red-700' : 'focus:border-green-500')
            }`}
            {...register('nickName')}
          />
        </label>

        <button className='mt-5 text-white btn btn-success'>회원가입 완료</button>
      </form>
    </div>
  );
}