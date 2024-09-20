import data from "../data/data.json";
import thumbnail from "../assets/thumbnail.png";
import {
  closestCorners,
  DndContext,
  // KeyboardSensor,
  // PointerSensor,
  // TouchSensor,
  // useSensor,
  // useSensors,
} from "@dnd-kit/core";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import {
  arrayMove,
  SortableContext,
  // sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import propTypes from "prop-types";
import { MdDragIndicator } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { IoArrowDown, IoArrowUp } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";

function CourseList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    alert(
      "You can drag and drop course. Also by double clicking on 3 dots you have 'Move to top' and 'Move to bottom' and 'Remove' options."
    );
    setCourses(data);
  }, []);

  const getCoursePos = (id) => courses.findIndex((course) => course.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id === over.id) return;

    setCourses((courses) => {
      const originalPos = getCoursePos(active.id);
      const newPos = getCoursePos(over.id);

      return arrayMove(courses, originalPos, newPos);
    });
  };

  const moveUp = (id) => {
    setCourses((courses) => {
      const originalPos = getCoursePos(id);
      return arrayMove(courses, originalPos, 0);
    });
  };

  const moveDown = (id) => {
    setCourses((courses) => {
      const originalPos = getCoursePos(id);
      return arrayMove(courses, originalPos, courses.length - 1);
    });
  };

  const removeCourse = (id) => {
    setCourses((courses) => {
      return courses.filter((course) => course.id !== id);
    });
  };

  // const sensors = useSensors(useSensor(PointerSensor),
  //   useSensor(TouchSensor), useSensor(KeyboardSensor), {
  //   coordinateGetter: sortableKeyboardCoordinates,
  // })

  return (
    <div className="w-full pt-36 pb-10 min-h-screen bg-emerald-200 flex items-center justify-center px-5">
      <div className="max-w-[1024px] w-full min-h-[50vh] h-fit p-5 bg-white rounded-xl shadow-lg">
        <Header
          heading="Manage Bundle"
          para="Change orders of the products based on priority"
        />
        <DndContext
          // sensors={sensors}
          onDragEnd={handleDragEnd}
          collisionDetection={closestCorners}
        >
          <div className="w-full h-fit p-5 flex flex-col gap-3 items-center">
            <SortableContext
              items={courses}
              strategy={verticalListSortingStrategy}
            >
              {courses.map((course) => (
                <Course
                  key={course.id}
                  removeCourse={removeCourse}
                  moveUp={moveUp}
                  moveDown={moveDown}
                  course={course}
                />
              ))}
            </SortableContext>
          </div>
        </DndContext>
      </div>
    </div>
  );
}

const Course = ({ course, moveUp, moveDown, removeCourse }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: course.id });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  const [showActionBox, setShowActionBox] = useState(false);

  const handleShow = () => {
    if (showActionBox) {
      setShowActionBox(false);
    } else {
      setShowActionBox(true);
    }
  };

  const handleMoveUp = () => {
    moveUp(course.id);
    setShowActionBox(false);
  };

  const handleMoveDown = () => {
    moveDown(course.id);
    setShowActionBox(false);
  };

  return (
    <div
      key={course.id}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="course w-full h-24 flex items-center gap-3 justify-between px-5 py-2 rounded-md shadow-md bg-white"
    >
      <div className="flex gap-3 h-full items-center">
        <div className="text-xl hover:cursor-grab">
          <MdDragIndicator />
        </div>
        <div className="hidden sm:block w-36 h-full rounded-md overflow-hidden">
          <img
            // src={course.imgUrl}
            src={thumbnail}
            className="object-cover w-full h-full"
            alt={course.title}
          />
        </div>
        <div className="font-semibold">{course.title}</div>
      </div>
      <div className="flex gap-3 items-center relative">
        <p className="font-medium hidden md:block">
          {course.price !== "Free" ? `Rs. ${course.price}/-` : course.price}
        </p>
        <p className="hidden lg:block font-medium p-2 text-sm rounded-md border-1 border-slate-300 bg-[#DBFFCE]">
          {course.courseType}
        </p>
        <div className="cursor-pinter text-xl" onClick={handleShow}>
          <HiDotsVertical className="cursor-pointer" />
        </div>
        {showActionBox && (
          <div className="absolute w-max z-10 top-full right-0 xl:left-full bg-white p-3 rounded-md shadow-lg flex flex-col justify-center gap-3">
            <p
              onClick={handleMoveUp}
              className="flex gap-2 items-center cursor-pointer"
            >
              <IoArrowUp />
              Move To Top
            </p>
            <p
              onClick={handleMoveDown}
              className="flex gap-2 items-center cursor-pointer"
            >
              <IoArrowDown />
              Move to Down
            </p>
            <p
              onClick={() => removeCourse(course.id)}
              className="flex gap-2 items-center text-red-500 cursor-pointer"
            >
              <RiDeleteBinLine />
              Remove
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

Course.propTypes = {
  course: propTypes.shape().isRequired,
  removeCourse: propTypes.func.isRequired,
  moveUp: propTypes.func.isRequired,
  moveDown: propTypes.func.isRequired,
};

export default CourseList;
