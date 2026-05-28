const SortBy = ({
  sortBy,
  sortDirection,
  onSortByChange,
  onSortDirectionChange,
}) => {
  return (
    <>
      <label htmlFor='sort-by'>Sort by </label>
      <select
        name='sort-by'
        id='sort-by'
        value={sortBy}
        onChange={onSortByChange}
      >
        <option value='creationDate'>Creation Date</option>
        <option value='title'>Title</option>
      </select>
      <label htmlFor='order'> Order </label>
      <select
        name='order'
        id='order'
        value={sortDirection}
        onChange={onSortDirectionChange}
      >
        <option value='desc'>Descending</option>
        <option value='asc'>Ascending</option>
      </select>
    </>
  );
};

export default SortBy;
