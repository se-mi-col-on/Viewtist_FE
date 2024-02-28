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
    <div className='flex items-center w-full mt-6 border-2'>
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
            className='input input-bordered focus:border-green-500'
            {...register('id')}
          />
        </label>

        <label className='w-full max-w-xs form-control'>
          <div className='label'>
            <span className='font-bold label-text'>비밀번호</span>
          </div>
          <input
            type='text'
            placeholder='Type here'
            className='input input-bordered focus:border-green-500'
            {...register('pw')}
          />
        </label>

        <label className='w-full max-w-xs form-control'>
          <div className='label'>
            <span className='font-bold label-text'>비밀번호 확인</span>
          </div>
          <input
            type='text'
            placeholder='Type here'
            className={`input input-bordered focus:border-green-500 ${
              errors.pwRequired && 'border-red-700'
            }`}
            {...register('pwRequired', {
              required: '비밀번호를 다시 입력해주세요.',
              minLength: { message: '최소 5자 이상 입력해주세요.', value: 5 },
              maxLength: {
                message: '최대 20자까지만 입력해주세요.',
                value: 20,
              },
            })}
          />
          {errors.pwRequired && <span className='text-red-500'>{errors.pwRequired.message}</span>}
        </label>

        <label className='w-full max-w-xs form-control'>
          <div className='label'>
            <span className='font-bold label-text'>이메일</span>
          </div>
          <input
            type='text'
            placeholder='Type here'
            className='input input-bordered focus:border-green-500'
            {...register('email')}
          />
        </label>

        <label className='w-full max-w-xs form-control'>
          <div className='label'>
            <span className='font-bold label-text'>닉네임</span>
          </div>
          <input
            type='text'
            placeholder='Type here'
            className='input input-bordered focus:border-green-500'
            {...register('nickName')}
          />
        </label>

        <button className='mt-5 text-white btn btn-success'>회원가입 완료</button>
      </form>
    </div>
  );
}
