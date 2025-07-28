const Form = () => {
  return (
    <form>
      <div className="flex flex-col gap-4 w-80 mx-auto mt-10">
        <div>
          <label htmlFor="userEmail" className="block mb-1 font-semibold">
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="userEmail"
            placeholder="Enter your email"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="userPassword" className="block mb-1 font-semibold">
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="userPassword"
            placeholder="Enter your password"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Form;
