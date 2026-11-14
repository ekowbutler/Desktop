import array
arr = array.array('i', [1, 2, 3, 4, 5])

def get_element(array, index ):
    for i in range(len(array)+1):
        if i == array[index]:
            return i
    return -1

print(get_element(arr, 5))

# create an array and traverse

# def traverse(arr):
#     for i in range(len(arr)):
#         print(arr[i])


# traverse(arr)

# access individual elements through index

# def access_element(arr, target):
#     for i in range (len(arr)):
#         if arr[i] == target:
#             return i
#     return -1

# print(access_element(arr, 0))

# # append a new element to the array

# arr.append(30)
# print(arr)

# arr.insert(0,21)

