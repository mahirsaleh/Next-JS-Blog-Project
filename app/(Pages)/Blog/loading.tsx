/*
 * plese check global.css. We created a section for loading.tsx style to 
  avoid react dev tool error ! ;
*/
export default function Loading() {
  return (
    <div className="loadingContainer">
      <div className="loadingCircle"></div>
    </div>
  );
}
