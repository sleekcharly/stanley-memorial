import React, { useRef, useState, useEffect } from 'react';
import Hero from './Hero';
import NavLinks from './NavLinks';
import NextLink from 'next/link';
import { MailIcon } from '@heroicons/react/outline';
import { PhotographIcon, BookOpenIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import axios from 'axios';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
// suneditor stuff
// Import Sun Editor's CSS File
import 'suneditor/dist/css/suneditor.min.css';

const SunEditor = dynamic(() => import('suneditor-react'), { ssr: false });

function MemoriesComponent({ session }) {
  const [body, setBody] = useState('');
  const filePickerRef = useRef(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [posts, setPosts] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errors, setErrors] = useState({
    firstName: null,
    lastName: null,
    body: null,
  });
  const [loading, setLoading] = useState(false);

  //   set router
  const router = useRouter();

  const addImageToPost = (event) => {
    const reader = new FileReader();
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setThumbnail(readerEvent.target.result);
    };
  };

  //   handle form change
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  //bring in posts
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      axios
        .get('/api/get-memories')
        .then((res) => {
          setPosts(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }

    return () => (mounted = false);
  }, []);

  console.log(posts);

  // handle editor change
  const handleEditorChange = (content) => {
    const data = content;
    setBody(data);
  };

  //   handle submitting of messages and condolences
  const handleSubmit = (event) => {
    event.preventDefault();

    setLoading(true);

    if (!body || body == '<p><br></p>') {
      setErrors({ body: 'Please enter your condolence message !' });
      setLoading(false);
      return;
    }

    if (firstName === '') {
      setErrors({ firstName: 'Please enter your first name !' });
      setLoading(false);
      return;
    }

    if (lastName === '') {
      setErrors({ lastName: 'Please enter your last name !' });
      setLoading(false);
      return;
    }

    const condolenceMessage = {
      body: body,
      memory: thumbnail,
      firstName: firstName,
      lastName: lastName,
    };

    // post message
    axios
      .post(`/api/post-memories`, condolenceMessage)
      .then((data) => {
        // setThumbnail(null);
        setBody('');
        window.location.reload();
      })
      .catch((err) => {
        console.error(err.response.data);
        setLoading(false);
      });
  };

  return (
    <div className="bg-white rounded-md py-7 px-5 ">
      <Hero />

      {/* content */}
      <div className="mt-12">
        <NavLinks />

        {/* main */}
        <div className="flex flex-col lg:flex-row mt-10">
          <div className="flex-grow lg:w-[80%] lg:mr-20">
            {/* condolences and memories */}
            <div>
              <a id="leave-a-message" className="hidden" />
              <p className="text-gray-600 text-lg md:text-xl font-semibold mb-7">
                Memories & condolences
              </p>

              {/* buttons */}
              {/* <div className="flex items-center space-x-5 mb-5">
                <div
                  className="flex flex-col p-6 w-32 md:p-8 md:w-36 lg:p-10 lg:w-40 items-center border border-[#800000] border-opacity-60 rounded-lg cursor-pointer hover:bg-[#800000] hover:text-white  text-[#800000] text-opacity-80 group"
                  onClick={() => filePickerRef.current.click()}
                >
                  <PhotographIcon className="w-8 h-8  " />
                  <p className="text-base md:text-lg ">Photo</p>
                  <input
                    onChange={addImageToPost}
                    type="file"
                    ref={filePickerRef}
                    className="hidden"
                  />
                </div>

                {thumbnail && (
                  <div className=" rounded-lg cursor-pointer ">
                    <img
                      src={thumbnail}
                      alt=""
                      className="object-cover w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer"
                    />
                  </div>
                )}
              </div> */}

              {/* form */}
              <div className="border-b border-gray-800 border-opacity-20 pb-10 mb-10">
                <form onSubmit={handleSubmit}>
                  <p className="text-sm mb-2">YOUR CONDOLENCE</p>

                  {/* name section */}
                  <div className="mb-5 flex flex-col space-y-3 md:flex-row md:space-x-5 md:space-y-0 md:items-center ">
                    <span>
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First name"
                        value={firstName}
                        onChange={handleFirstNameChange}
                        className="placeholder-gray-400 border border-[#800000] border-opacity-40 rounded-lg break-words p-1 h-10"
                      />
                      {errors && errors.firstName ? (
                        <p className="text-sm text-red-600">
                          {errors.firstName}
                        </p>
                      ) : null}
                    </span>

                    <span>
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last name"
                        value={lastName}
                        onChange={handleLastNameChange}
                        className="placeholder-gray-400 border border-[#800000] border-opacity-40 rounded-lg break-words  p-1 h-10"
                      />
                      {errors && errors.lastName ? (
                        <p className="text-sm text-red-600">
                          {errors.lastName}
                        </p>
                      ) : null}
                    </span>
                  </div>

                  <div className="mb-8">
                    <SunEditor
                      height="auto"
                      width="auto"
                      setContents={body}
                      onChange={handleEditorChange}
                      placeholder="Welcome friend, kindly place your condolence message."
                      setOptions={{
                        buttonList: [
                          [
                            'font',
                            'fontSize',
                            'bold',
                            'italic',
                            'blockquote',
                            'align',
                          ],
                        ],
                        minHeight: '200',
                        defaultStyle: 'font-size: 18px',
                      }}
                    />

                    {errors && errors.body ? (
                      <p className="text-sm text-red-600">{errors.body}</p>
                    ) : null}
                  </div>

                  {/* form actions */}
                  <div className="flex flex-col space-y-3 md:flex-row items-center md:space-x-3 w-full">
                    <button
                      type="submit"
                      className="w-[80%] md:w-[30%] h-14 bg-[#800000] bg-opacity-80 text-white rounded-md font-semibold text-base md:text-xl"
                      style={{ backgroundColor: '#800000' }}
                      disabled={loading}
                    >
                      Post condolence
                    </button>
                    {loading && (
                      <div role="status">
                        <svg
                          aria-hidden="true"
                          class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span class="sr-only">Loading...</span>
                      </div>
                    )}
                  </div>
                </form>
              </div>

              {/* hidden a tag */}
              <a id="messages">
                <p className="text-gray-600 font-semibold text-lg xl:text-2xl mb-4">
                  Messages
                </p>
              </a>

              {/* posted condolence messages */}
              {posts &&
                posts.map((post) => (
                  <div
                    className="border-b border-gray-800 border-opacity-20 pb-10 mb-10"
                    key={post.postId}
                  >
                    {/* photograph if any */}
                    {/* <div className="md:max-w-[600px] xl:max-w-[700px] mb-3">
                  <img
                    src="/images/deeOgbo/chesterAndWife2.jpg"
                    alt=""
                    className="object-cover rounded-md"
                  />
                </div> */}
                    {/* message info */}
                    <div className="flex items-center space-x-3 xl:space-x-4">
                      <p className="text-xl xl:text-2xl font-semibold text-gray-700">
                        By
                      </p>
                      <p className="text-lg xl:text-xl font-semibold text-[#800000]">
                        {post.fullName}
                      </p>
                    </div>

                    {/* message */}
                    <div className="mb-4">
                      <SunEditor
                        setContents={post.body}
                        disable={true}
                        hideToolbar={true}
                        height="auto"
                        setOptions={{
                          defaultStyle: 'font-size: 18px',
                        }}
                      />
                    </div>
                    {/* date message was shared */}
                    <div>
                      <p className="text-sm text-blue-600">
                        {`Shared on ${dayjs(post.createdAt).format(
                          'MMMM D, YYYY h:mm A',
                        )} WAT`}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* second burial card */}
          <div className="relative w-[250px] h-[600px] xl:w-[350px] xl:h-[750px] mr-auto ml-auto">
            <Image
              src="/images/stanley/stanley_7.jpg"
              alt=""
              quality="100"
              layout="fill"
              className="rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemoriesComponent;
