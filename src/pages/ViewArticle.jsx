import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchArticleById } from "../slices/articlesSlice";

const ViewArticle = () => {
  const { articleId } = useParams();
  const dispatch = useDispatch();
  const article = useSelector((state) =>
    state.articles.items.find((article) => article.id === articleId)
  );

  useEffect(() => {
    dispatch(fetchArticleById(articleId));
  }, [dispatch, articleId]);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">{article.title}</h1>
      <p className="text-lg mb-4">{article.description}</p>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Ingredients:</h2>
        <ul>
          {article.ingredients.map((ingredient, index) => (
            <li key={index} className="mb-1">
              {ingredient}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Cooking Method:</h2>
        <p>{article.cook_method}</p>
      </div>
    </div>
  );
};

export default ViewArticle;
