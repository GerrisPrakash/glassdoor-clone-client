export default function Input(props) {
  return (
    <input
      className="w-full p-2 border border-gray-300 rounded 
                 text-gray-900 placeholder-gray-400
                 focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...props}
    />
  );
}
