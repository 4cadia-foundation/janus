export default class ArrayHelper {
  public static Merge(array1, array2) {
    const array = array1.concat(array2);
    return this.Unique(array);
  }

  public static Unique(array) {
    const a = array.concat();
    for (let i = 0; i < a.length; ++i) {
      for (let j = i + 1; j < a.length; ++j) {
        if (a[i] === a[j]) {
          a.splice(j--, 1);
        }
      }
    }
    return a;
  }
}
