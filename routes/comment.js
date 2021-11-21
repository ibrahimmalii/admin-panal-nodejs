const router = require("express").Router();
const auth = require("../middlewares/auth");
const Comment = require("../models/comment");

router.post("/:id", auth, async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const { description } = req.body;
  try {
    const comment = await new Comment({
      description,
      ownerName: user.name,
      bookId: id,
    }).save();
    res.send(comment);
  } catch (e) {
    res.status(500).json();
  }
});

router.post("/delete/:id", auth, async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  try {
    const currentComment = await Comment.findOne({ _id: id });
    if (currentComment.ownerName === user.name) {
      const comment = await Comment.findByIdAndRemove(id);
      res.json(comment);
    } else {
      res.status(403).json("Authenticate field");
    }
  } catch (e) {
    res.json(e);
  }
});

router.get("/", async (req, res) => {
  const comments = await Comment.find();
  res.send(comments);
});

router.put("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).json({ error: "error value for updates" });
  }

  const comment = await Comment.findByIdAndUpdate(id, description);
  try {
    updates.forEach((update) => (comment[update] = req.body[update]));
    await comment.save();
    res.status(200).json(comment);
  } catch (e) {}
});

router.delete("/:id", auth, async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  try {
    const currentComment = await Comment.findOne({ _id: id });
    if (currentComment.ownerName === user.name) {
      const comment = await Comment.findByIdAndRemove(id);
      res.json(comment);
    } else {
      res.status(403).json("Authenticate field");
    }
  } catch (e) {
    res.json(e);
  }
});

module.exports = router;
