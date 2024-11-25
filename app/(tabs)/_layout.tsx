
import React, { useRef, useState } from 'react';
import { Text, View, StyleSheet, useWindowDimensions, FlatList } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, { ICarouselInstance, Pagination } from 'react-native-reanimated-carousel';
import { useSelector } from 'react-redux';
import ModalComponent from '@/components/ui/modals/TaskModalForm';
import { editTask, status_badge, task } from '@/types/task.type';
import { State_Store_Task } from '@/redux/store/tasks';
import SearchBar from '@/components/ui/SearchBar';
import { categories } from '@/constants/fake_data';
import CategoryCard from '@/components/ui/cards/CategoryCard';
import Board from '@/components/ui/Board';




const Home = () => {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [editItem, setEditItem] = useState<editTask | null>();
  const [search, setSearch] = useState<string>('');
  const [type, setType] = useState<status_badge>();
  const [filter, setFilter] = useState<status_badge[]>([]);
  const ref = useRef<ICarouselInstance>(null);
  const { width, height } = useWindowDimensions();
  const scrollOffsetValue = useSharedValue<number>(0);
  const progress = useSharedValue<number>(0);
  const tasks = useSelector((state: any) => state.task); // TODO: add type

  const AddNewTask = (type: status_badge) => {
    setType(type);
    setOpenCreateModal(true);
  }

  const EditATask = (edit_task: editTask, type: status_badge) => {
    setEditItem(edit_task);
    setType(type);
    setOpenCreateModal(true);
  }

  const AddFilter = (value: status_badge) => {
    if (value === 'All') {
      setFilter([]);
    } else {
      if (filter?.includes(value)) {
        // remove
        let index = filter.findIndex((item) => item === value);
        let arr = [...filter];
        arr.splice(index, 1);
        setFilter(arr);
      } else {
        let arr = [...filter];
        arr.push(value);
        setFilter(arr);
      }
    }

  }

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };



  return (
    <View style={{ backgroundColor: '#0d81c0', flex: 1 }} >

      <SearchBar
        onChange={setSearch}
      />

      {/* show categories */}
      <View style={styles.categoryContainer}>
        <FlatList
          horizontal
          data={categories}
          renderItem={({ item, index }) =>
            <CategoryCard
              key={String('category-' + item.id)}
              item={item} AddFilter={AddFilter}
              filter={filter} />
          }
        />

      </View>

      {tasks &&
        <Carousel
          width={width}
          height={height}
          loop={false}
          ref={ref}
          onProgressChange={progress}
          defaultScrollOffsetValue={scrollOffsetValue}
          data={filter.length > 0 ? tasks?.allTasks?.filter((it: State_Store_Task) => filter.includes(it.title)) : tasks?.allTasks}
          style={{ backgroundColor: '#0d81c0' }}
          pagingEnabled={true}
          renderItem={({ index, item }: any) => (
            <Board
              key={String('board-' + item.title)}
              search={search}
              data={item.tasks}
              title={item.title}
              type={item.type}
              addBtn={AddNewTask}
              EditATask={EditATask}
            />
          )}
        />
      }
      
      {/* modal to add and edit and delete */}
      {
        type &&
        <ModalComponent
          type={type}
          editMode={editItem ? true : false}
          setEditItem={setEditItem}
          editItem={editItem}
          open={openCreateModal}
          setClose={setOpenCreateModal}
        />
      }

      {/* pagination */}
      <Pagination.Basic
        progress={progress}
        data={filter.length > 0 ? tasks?.allTasks?.filter((it: State_Store_Task) => filter.includes(it.title)) : tasks?.allTasks}
        dotStyle={{ backgroundColor: '#ffffff5c', borderRadius: 40 }}
        size={8}
        key={String('ads')}
        activeDotStyle={{ backgroundColor: '#fff' }}
        containerStyle={{
          gap: 10,
          position: 'absolute',
          bottom: 60,
        }}
        onPress={onPressPagination}
      />

    </View>



  );
}


export default Home;


const styles = StyleSheet.create({
  categoryContainer: {
    height: 70, flexDirection: 'row',
    justifyContent: 'space-between',
  }
})









const Card = ({ item }: { item: task }) => {

  return (
    <View style={{
      ...cardStyles.container,
      backgroundColor: new Date(item.due_date.replace(/\//g, "-")) < new Date() ? '#de6259' : 'white'
    }}>
      <Text>{item.title}</Text>
      <Text numberOfLines={1}>{item.description}</Text>
    </View>
  )
}



const cardStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 6,
    marginTop: 10,
    paddingVertical: 10,
    width: '100%'
  },
  header: {
    width: '100%',
    backgroundColor: '#D6D6D6',
    height: 45,
    borderRadius: 6,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10
  }
})



