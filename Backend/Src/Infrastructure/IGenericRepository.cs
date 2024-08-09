using System.Linq.Expressions;

namespace EmergencyDepartment.Infrastructure;

public interface IGenericRepository<T>
{
	IEnumerable<T> FetchAll();

	IEnumerable<T> FetchAllWhere(Expression<Func<T, bool>> expression);

	T FetchSingleByKey(int key);

	T FetchSingleByKey(long key);

	T FetchSingleWhere(Expression<Func<T, bool>> expression);

	T Create(T entity);

	T Update(T entity);

	T Delete(T entity);

	void SaveChanges();
}
