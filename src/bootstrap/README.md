# Bootstrap

TODO: genellikle `Vue.use()` ile eklenecek şeyler için varlar

Bootstrap dosyalarının `initialize()` methodları herhangi bir şey döndürebilir (undefined - not
returning something, null, literal, object, array, promise, function - for delegation).

default olarak export edecekse initialize için kullanılacak fonksiyon olmalı ya da named export
edecekse de ismi 'initialize' olan bir fonksiyon _da_ export etmeli. En azından `name` sabitini
de export etmesi gerekir. Bunun yanında `priority` sabiti de atanıp export edilebilir. Initialize
amacıyla export edilen default'un yanında `name` (ve istenirse `priority`) `export const ` şeklinde
export edilebilir ve EDİLMELİDİR -SHOULD-.

`Vue.use()` için kullanılacaksa `priority` sabitinin 1000'den büyük bir sayıyla atanıp export
edilmesi önerilir. Hatta 1000, 'priority' özelliği için, 'bootstrapper' tarafından atanan
(öntanımlı) değer olduğundan dolayı, o bootstrap dosyasının `priority` özelliği atanmasa da 'app'
bootstrap dosyasından sonra çalışacak, tabi eğer isme göre sıralamada 'app' kelimesinden önce
gelecek bir bootstrap dosyanız yoksa. aksi takdirde bu dosyanın `priority` özelliği 1000'den
büyük bir şey olarak elle atanıp export edilmesi.

Initialize fonksiyonuna ilk parametre olarak `Vue` ve `rets` nesnelerinden oluşan bir obje alır,
yani parametre `{ Vue, rets }` olarak karşılanabilir. Bu fonksiyonun `this`i `null`dur.
